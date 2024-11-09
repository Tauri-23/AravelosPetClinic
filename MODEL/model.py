import torch
from transformers import BertTokenizer, BertForSequenceClassification
import numpy as np
import pandas as pd
from typing import List, Dict, Optional
from sklearn.cluster import MiniBatchKMeans
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score, matthews_corrcoef
import gc
import os
from tqdm import tqdm
from datetime import datetime


class VetFeedbackAnalyzer:
    def __init__(self, batch_size=16):
        self.batch_size = batch_size
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Using device: {self.device}")

        # Initialize tokenizer
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')

        # Track model state
        self.current_model_path = None
        self.is_base_model = True
        self.best_model_path = None
        self.best_metrics = None

        # Initialize with base model
        self._load_base_model()

        # Aspect keywords (same as original)
        self.aspect_keywords = {
            'hygiene': {
                'en': ['clean', 'sanitize', 'hygiene', 'dirty', 'smell', 'neat'],
                'tl': ['malinis', 'maayos', 'madumi', 'mabaho', 'maalikabok']
            },
            'waiting_time': {
                'en': ['wait', 'long', 'quick', 'fast', 'hours', 'delay'],
                'tl': ['maghintay', 'matagal', 'mabilis', 'oras', 'antay']
            },
            'customer_service': {
                'en': ['staff', 'service', 'friendly', 'rude', 'helpful', 'attentive'],
                'tl': ['kawani', 'serbisyo', 'magalang', 'bastos', 'matulungin']
            },
            'vet_care': {
                'en': ['treatment', 'doctor', 'vet', 'examination', 'diagnosis', 'care'],
                'tl': ['gamot', 'doktor', 'beterinaryo', 'eksamin', 'alaga']
            },
            'pricing': {
                'en': ['price', 'expensive', 'cheap', 'cost', 'affordable', 'fee'],
                'tl': ['presyo', 'mahal', 'mura', 'halaga', 'bayad']
            }
        }

        self.sentiment_rules = {
            'positive': {
                'en': ['good', 'great', 'excellent', 'awesome', 'satisfied', 'happy'],
                'tl': ['maganda', 'mahusay', 'masaya', 'kontento', 'magaling']
            },
            'negative': {
                'en': ['bad', 'poor', 'terrible', 'worst', 'disappointed', 'horrible'],
                'tl': ['pangit', 'masama', 'hindi maganda', 'hindi mahusay', 'malala']
            }
        }
        self.model_info = {
            'path': None,
            'format': None,  # 'old' or 'new'
            'epoch': None,
            'timestamp': None
        }
    def _parse_model_path(self, model_path: str) -> dict:
        """Parse both old and new format model paths"""
        info = {}
        if '_epoch_' in model_path:
            if '_20' in model_path:  # New format with timestamp
                # Format: trained_model_20241109_123456_epoch_3
                parts = model_path.split('_')
                info['format'] = 'new'
                info['epoch'] = int(parts[-1])
                info['timestamp'] = f"{parts[-4]}_{parts[-3]}"
            else:  # Old format
                # Format: MODEL\_epoch_3
                info['format'] = 'old'
                info['epoch'] = int(model_path.split('_')[-1])
                info['timestamp'] = None
        return info
    def load(self, model_path: str):
        """Load a saved model with support for both formats"""
        try:
            print(f"Loading model from: {model_path}")
            # Parse model path information
            info = self._parse_model_path(model_path)

            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model path not found: {model_path}")

            self.model = BertForSequenceClassification.from_pretrained(
                model_path,
                torch_dtype=torch.float32
            ).to(self.device)

            self.model_info = {
                'path': model_path,
                **info
            }
            self.current_model_path = model_path
            self.is_base_model = False

            print("\nModel loaded successfully!")
            print(f"Format: {'New' if info.get('format') == 'new' else 'Old'}")
            print(f"Epoch: {info.get('epoch')}")
            if info.get('timestamp'):
                print(f"Trained on: {info.get('timestamp')}")

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            print("Falling back to base model...")
            self._load_base_model()

    def _load_base_model(self):
        """Load the base BERT model"""
        self.model = BertForSequenceClassification.from_pretrained(
            'bert-base-multilingual-cased',
            num_labels=3,
            torch_dtype=torch.float32
        ).to(self.device)
        self.is_base_model = True
        self.current_model_path = None
        print("Base BERT model loaded")

    def get_model_status(self) -> str:
        """Return current model status with detailed information"""
        if self.is_base_model:
            return "Using base BERT model (untrained)"

        status = f"Using trained model: {self.current_model_path}"
        if self.model_info['format'] == 'old':
            status += f" (Legacy format, Epoch {self.model_info['epoch']})"
        elif self.model_info['format'] == 'new':
            status += f" (Trained on {self.model_info['timestamp']}, Epoch {self.model_info['epoch']})"
        return status

    def detect_language(self, text: str) -> str:
        """Detect if text is primarily English or Tagalog"""
        tagalog_markers = set(['ang', 'ng', 'mga', 'sa', 'na', 'at'])
        words = text.lower().split()
        if len(words) == 0:
            return 'en'
        tagalog_count = sum(1 for word in words if word in tagalog_markers)
        return 'tl' if tagalog_count / len(words) > 0.1 else 'en'

    def identify_aspects(self, text: str, lang: str) -> List[str]:
        """Identify aspects mentioned in text"""
        text = text.lower()
        aspects = []
        for aspect, keywords in self.aspect_keywords.items():
            if any(keyword in text for keyword in keywords[lang]):
                aspects.append(aspect)
        return aspects if aspects else ['general']

    def analyze_sentiment(self, text: str) -> str:
        """Rule-based sentiment analysis"""
        lang = self.detect_language(text)
        text = text.lower()

        pos_count = sum(1 for word in self.sentiment_rules['positive'][lang] if word in text)
        neg_count = sum(1 for word in self.sentiment_rules['negative'][lang] if word in text)

        if pos_count > neg_count:
            return 'positive'
        elif neg_count > pos_count:
            return 'negative'
        return 'neutral'

    def train_batch(self, texts, labels):
        """Process a single training batch"""
        encoded = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors='pt'
        )

        input_ids = encoded['input_ids'].to(self.device)
        attention_mask = encoded['attention_mask'].to(self.device)
        labels = torch.tensor(labels).to(self.device)

        self.optimizer.zero_grad()
        outputs = self.model(input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        loss.backward()
        self.optimizer.step()

        # Clear memory
        del input_ids, attention_mask, outputs, labels
        torch.cuda.empty_cache() if self.device.type == 'cuda' else None

        return loss.item()

    def train(self, dataset_path: str, model_save_path: str, epochs=3):
        """Train model with memory optimization and best model tracking"""
        print("Starting training...")
        self._load_base_model()  # Start fresh with base model
        self.model.train()
        self.optimizer = torch.optim.AdamW(self.model.parameters(), lr=2e-5)

        best_metrics = None
        best_epoch = None
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_save_path = f"{model_save_path}_{timestamp}"

        for epoch in range(epochs):
            total_loss = 0
            batch_count = 0

            # Process data in chunks
            for chunk in tqdm(pd.read_csv(dataset_path, chunksize=self.batch_size),
                            desc=f'Epoch {epoch+1}/{epochs}'):
                chunk['sentiment'] = chunk['review'].apply(self.analyze_sentiment)
                texts = chunk['review'].tolist()
                labels = [0 if s == 'negative' else 1 if s == 'positive' else 2
                         for s in chunk['sentiment']]

                loss = self.train_batch(texts, labels)
                total_loss += loss
                batch_count += 1

                gc.collect()

            avg_loss = total_loss / batch_count
            print(f'Epoch {epoch+1} - Average loss: {avg_loss:.4f}')

            # Save epoch model
            epoch_save_path = f"{base_save_path}_epoch_{epoch+1}"
            os.makedirs(epoch_save_path, exist_ok=True)
            self.model.save_pretrained(epoch_save_path)

            # Evaluate current epoch
            self.current_model_path = epoch_save_path
            self.is_base_model = False
            metrics = self.evaluate(dataset_path, quiet=True)

            # Track best model
            if best_metrics is None or metrics['f1_score'] > best_metrics['f1_score']:
                best_metrics = metrics
                best_epoch = epoch + 1
                self.best_model_path = epoch_save_path
                self.best_metrics = metrics

            print(f"Epoch {epoch+1} metrics:")
            self._print_metrics(metrics)

        print("\nTraining completed!")
        print(f"Best performing model was epoch {best_epoch}:")
        self._print_metrics(best_metrics)
        print(f"Best model saved at: {self.best_model_path}")

    def load(self, model_path: str):
        """Load a saved model"""
        try:
            print(f"Loading model from: {model_path}")
            self.model = BertForSequenceClassification.from_pretrained(
                model_path,
                torch_dtype=torch.float32
            ).to(self.device)
            self.current_model_path = model_path
            self.is_base_model = False
            print("Model loaded successfully!")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            print("Falling back to base model...")
            self._load_base_model()

    def evaluate_batch(self, texts, labels):
        """Evaluate a single batch"""
        encoded = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors='pt'
        )

        with torch.no_grad():
            input_ids = encoded['input_ids'].to(self.device)
            attention_mask = encoded['attention_mask'].to(self.device)
            outputs = self.model(input_ids, attention_mask=attention_mask)
            predictions = torch.argmax(outputs.logits, dim=1).cpu().numpy()

        del input_ids, attention_mask, outputs
        torch.cuda.empty_cache() if self.device.type == 'cuda' else None

        return predictions

    def _print_metrics(self, metrics):
        """Helper to print evaluation metrics"""
        print(f"Accuracy: {metrics['accuracy']:.4f}")
        print(f"Precision: {metrics['precision']:.4f}")
        print(f"Recall: {metrics['recall']:.4f}")
        print(f"F1-Score: {metrics['f1_score']:.4f}")
        print(f"Matthews Correlation: {metrics['matthews_correlation_coefficient']:.4f}")

    def evaluate(self, dataset_path: str, quiet=False):
        """Evaluate model performance"""
        if not quiet:
            print("Starting evaluation...")
            print(self.get_model_status())

        self.model.eval()
        all_predictions = []
        all_labels = []

        # Process in batches
        for chunk in tqdm(pd.read_csv(dataset_path, chunksize=self.batch_size),
                         desc='Evaluating', disable=quiet):
            chunk['sentiment'] = chunk['review'].apply(self.analyze_sentiment)
            texts = chunk['review'].tolist()
            labels = [0 if s == 'negative' else 1 if s == 'positive' else 2
                     for s in chunk['sentiment']]

            predictions = self.evaluate_batch(texts, labels)
            all_predictions.extend(predictions)
            all_labels.extend(labels)

            gc.collect()

        # Calculate metrics
        metrics = {
            'accuracy': accuracy_score(all_labels, all_predictions),
            'recall': recall_score(all_labels, all_predictions, average='macro'),
            'precision': precision_score(all_labels, all_predictions, average='macro'),
            'f1_score': f1_score(all_labels, all_predictions, average='macro'),
            'matthews_correlation_coefficient': matthews_corrcoef(all_labels, all_predictions)
        }

        if not quiet:
            print("\nModel Performance Metrics:")
            self._print_metrics(metrics)

        return metrics

    def test(self, feedback: str):
        """Test model on single feedback"""
        print(self.get_model_status())
        self.model.eval()

        encoded = self.tokenizer(
            feedback,
            padding=True,
            truncation=True,
            max_length=128,
            return_tensors='pt'
        )

        with torch.no_grad():
            input_ids = encoded['input_ids'].to(self.device)
            attention_mask = encoded['attention_mask'].to(self.device)
            outputs = self.model(input_ids, attention_mask=attention_mask)
            prediction = torch.argmax(outputs.logits, dim=1).item()

        lang = self.detect_language(feedback)
        aspects = self.identify_aspects(feedback, lang)

        sentiment = ['negative', 'positive', 'neutral'][prediction]

        result = {
            'text': feedback,
            'language': 'Tagalog' if lang == 'tl' else 'English',
            'aspects': aspects,
            'sentiment': sentiment
        }

        return result

def list_available_models(base_path: str) -> List[Dict]:
    """List all available trained models with enhanced information"""
    available_models = []
    try:
        for item in os.listdir(base_path):
            full_path = os.path.join(base_path, item)
            if os.path.isdir(full_path) and "epoch" in item:
                model_info = {
                    'path': full_path,
                    'name': item
                }
                if '_20' in item:  # New format
                    parts = item.split('_')
                    model_info['format'] = 'new'
                    model_info['epoch'] = int(parts[-1])
                    model_info['timestamp'] = f"{parts[-4]}_{parts[-3]}"
                else:  # Old format
                    model_info['format'] = 'old'
                    model_info['epoch'] = int(item.split('_')[-1])
                    model_info['timestamp'] = None
                available_models.append(model_info)
    except Exception as e:
        print(f"Error listing models: {str(e)}")
    return sorted(available_models, key=lambda x: (x['format'] != 'old', x['epoch']))


def main():
    analyzer = VetFeedbackAnalyzer()
    base_model_path = "MODEL"

    while True:
        print("\nVet Feedback Analysis System")
        print("Current Model:", analyzer.get_model_status())
        print("\n1. Train model")
        print("2. Load model")
        print("3. Test model")
        print("4. View accuracy metrics")
        print("5. Exit")

        choice = input("\nEnter your choice (1-5): ")

        if choice == '2':
            print("\nAvailable trained models:")
            available_models = list_available_models(base_model_path)
            if not available_models:
                print("No trained models found in", base_model_path)
                continue

            for i, model in enumerate(available_models, 1):
                format_str = "Legacy" if model['format'] == 'old' else "New"
                timestamp_str = f", Trained: {model['timestamp']}" if model['timestamp'] else ""
                print(f"{i}. {model['name']} ({format_str} format, Epoch {model['epoch']}{timestamp_str})")

            try:
                choice = int(input("\nEnter model number to load (or 0 to cancel): "))
                if choice == 0:
                    continue
                if 1 <= choice <= len(available_models):
                    model_path = available_models[choice-1]['path']
                    analyzer.load(model_path)
                else:
                    print("Invalid choice!")
            except ValueError:
                print("Please enter a valid number")

        elif choice == '3':
            print(analyzer.get_model_status())
            feedback = input("Enter feedback text: ")
            try:
                result = analyzer.test(feedback)
                print("\nAnalysis Results:")
                print(f"Feedback: {result['text']}")
                print(f"Language: {result['language']}")
                print(f"Aspects: {', '.join(result['aspects'])}")
                print(f"Sentiment: {result['sentiment']}")
            except Exception as e:
                print(f"Error during testing: {str(e)}")

        elif choice == '4':
            if analyzer.is_base_model:
                print("\nWarning: Using untrained base model. Results may not be meaningful.")
                proceed = input("Do you want to proceed anyway? (y/n): ")
                if proceed.lower() != 'y':
                    continue

            dataset_path = input("Enter dataset path for evaluation: ")
            try:
                analyzer.evaluate(dataset_path)
            except Exception as e:
                print(f"Error during evaluation: {str(e)}")

        elif choice == '5':
            print("Goodbye!")
            break

        else:
            print("Invalid choice! Please enter a number between 1 and 5.")

if __name__ == "__main__":
    main()
