import torch
from transformers import BertTokenizer, BertForSequenceClassification, get_linear_schedule_with_warmup
import numpy as np
import pandas as pd
from typing import List, Dict
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score, matthews_corrcoef
from torch.utils.data import DataLoader, TensorDataset
from nltk.tokenize import word_tokenize
import nltk
import random
from textaugment import EDA
import re
from tqdm import tqdm

class ImprovedVetFeedbackAnalyzer:
    def __init__(self):
        # Initialize mBERT tokenizer and model with weighted loss
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')
        self.model = BertForSequenceClassification.from_pretrained(
            'bert-base-multilingual-cased',
            num_labels=3,
            problem_type="multi_label_classification"
        )

        # Download required NLTK data
        try:
            nltk.download('punkt')
            nltk.download('wordnet')
            nltk.download('averaged_perceptron_tagger')
        except:
            pass

        # Initialize text augmenter
        self.augmenter = EDA()

        # Enhanced aspect keywords with more terms
        self.aspect_keywords = {
            'hygiene': {
                'en': ['clean', 'sanitize', 'hygiene', 'dirty', 'smell', 'neat', 'sanitary', 'fresh', 'spotless',
                      'cleanliness', 'sterile', 'pristine', 'tidy', 'organized'],
                'tl': ['malinis', 'maayos', 'madumi', 'mabaho', 'maalikabok', 'malinis na malinis', 'presko',
                      'maayos na kapaligiran', 'walang dumi', 'malinis na lugar']
            },
            'waiting_time': {
                'en': ['wait', 'long', 'quick', 'fast', 'hours', 'delay', 'prompt', 'immediate', 'efficient',
                      'timely', 'schedule', 'appointment', 'punctual'],
                'tl': ['maghintay', 'matagal', 'mabilis', 'oras', 'antay', 'pagkahintay', 'tagal',
                      'hindi matagal', 'maagang serbisyo', 'walang antayan']
            },
            'customer_service': {
                'en': ['staff', 'service', 'friendly', 'rude', 'helpful', 'attentive', 'professional',
                      'courteous', 'responsive', 'accommodating', 'welcoming', 'understanding'],
                'tl': ['kawani', 'serbisyo', 'magalang', 'bastos', 'matulungin', 'propesyonal',
                      'magandang pakikitungo', 'mabait', 'masunurin', 'mapagbigay']
            },
            'vet_care': {
                'en': ['treatment', 'doctor', 'vet', 'examination', 'diagnosis', 'care', 'expertise',
                      'knowledgeable', 'thorough', 'experienced', 'skilled', 'competent'],
                'tl': ['gamot', 'doktor', 'beterinaryo', 'eksamin', 'alaga', 'paggamot',
                      'masusing pagsusuri', 'magaling na doktor', 'mahusay na pagpapagamot']
            },
            'pricing': {
                'en': ['price', 'expensive', 'cheap', 'cost', 'affordable', 'fee', 'reasonable',
                      'overpriced', 'value', 'worth', 'charges', 'pricing'],
                'tl': ['presyo', 'mahal', 'mura', 'halaga', 'bayad', 'gastos',
                      'abot-kaya', 'presyong makatwiran', 'sulit', 'hindi mahal']
            }
        }

        # Enhanced sentiment rules with more expressions and intensity levels
        self.sentiment_rules = {
            'positive': {
                'en': ['good', 'great', 'excellent', 'awesome', 'satisfied', 'happy', 'best', 'clean', 'friendly',
                      'amazing', 'wonderful', 'perfect', 'outstanding', 'fantastic', 'superb', 'exceptional',
                      'impressed', 'professional', 'recommended', 'reliable', 'caring', 'thorough', 'efficient'],
                'tl': ['maganda', 'mahusay', 'masaya', 'kontento', 'magaling', 'ayos', 'mabait',
                      'napakagaling', 'napakahusay', 'napakaganda', 'kahanga-hanga', 'magaling na magaling',
                      'lubos na kasiya-siya', 'napakabuti', 'maginhawa', 'kapuri-puri']
            },
            'negative': {
                'en': ['bad', 'poor', 'terrible', 'worst', 'disappointed', 'horrible', 'expensive', 'not satisfied',
                      'awful', 'unprofessional', 'rude', 'slow', 'dirty', 'incompetent', 'careless',
                      'unfriendly', 'unhelpful', 'overpriced', 'unreasonable', 'unacceptable'],
                'tl': ['pangit', 'masama', 'hindi maganda', 'hindi mahusay', 'malala', 'mahal', 'tagal',
                      'napakasama', 'napakapangit', 'napakabulok', 'walang kwenta', 'hindi kasiya-siya',
                      'hindi magaling', 'hindi maayos', 'sobrang mahal', 'hindi katanggap-tanggap']
            }
        }

        # Initialize device
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

    def preprocess_text(self, text: str) -> str:
        """Enhanced text preprocessing"""
        # Convert to lowercase
        text = text.lower()

        # Remove special characters but keep important punctuation
        text = re.sub(r'[^\w\s.,!?]', '', text)

        # Normalize whitespace
        text = ' '.join(text.split())

        # Add special handling for common abbreviations and domain-specific terms
        text = text.replace("dr.", "doctor")
        text = text.replace("dr", "doctor")
        text = text.replace("vet.", "veterinarian")
        text = text.replace("vet", "veterinarian")
        text = text.replace("appt.", "appointment")
        text = text.replace("appt", "appointment")
        text = text.replace("mins", "minutes")
        text = text.replace("hrs", "hours")

        return text

    def detect_language(self, text: str) -> str:
        """Improved language detection with more markers"""
        tagalog_markers = set(['ang', 'ng', 'mga', 'sa', 'na', 'at', 'ay', 'po', 'ko', 'namin', 'natin', 'ito', 'yung'])
        words = text.lower().split()
        tagalog_count = sum(1 for word in words if word in tagalog_markers)
        return 'tl' if tagalog_count / (len(words) + 1e-10) > 0.1 else 'en'

    def augment_data(self, text: str, num_augments: int = 3) -> List[str]:
        """Augment training data using enhanced EDA techniques"""
        augmented_texts = [text]  # Always include original text

        try:
            # Synonym replacement
            augmented_texts.append(self.augmenter.synonym_replacement(text))

            # Random insertion
            augmented_texts.append(self.augmenter.random_insertion(text))

            # Random swap
            augmented_texts.append(self.augmenter.random_swap(text))

            # Back translation (if available)
            # Note: Implement if you have access to translation API

        except Exception as e:
            print(f"Augmentation warning: {e}")
            # Fallback if augmentation fails
            while len(augmented_texts) < num_augments:
                augmented_texts.append(text)

        return augmented_texts[:num_augments]

    def identify_aspects(self, text: str, lang: str) -> List[str]:
        """Improved aspect identification with context awareness"""
        text = text.lower()
        aspects = set()

        # Check each aspect
        for aspect, keywords in self.aspect_keywords.items():
            # Check for exact matches
            if any(keyword in text for keyword in keywords[lang]):
                aspects.add(aspect)

            # Check for related phrases
            if aspect == 'waiting_time' and any(term in text for term in ['schedule', 'appointment', 'queue']):
                aspects.add(aspect)
            elif aspect == 'hygiene' and any(term in text for term in ['environment', 'facility', 'premises']):
                aspects.add(aspect)
            elif aspect == 'customer_service' and any(term in text for term in ['reception', 'front desk', 'staff']):
                aspects.add(aspect)

        return list(aspects) if aspects else ['general']

    def analyze_sentiment(self, text: str) -> str:
        """Enhanced sentiment analysis with context awareness"""
        lang = self.detect_language(text)
        text = text.lower()

        # Initialize sentiment scores
        positive_score = 0
        negative_score = 0

        # Check for sentiment keywords
        for pos_word in self.sentiment_rules['positive'][lang]:
            if pos_word in text:
                positive_score += 1
                # Check for intensity modifiers
                if any(modifier in text for modifier in ['very', 'really', 'super', 'napaka']):
                    positive_score += 0.5

        for neg_word in self.sentiment_rules['negative'][lang]:
            if neg_word in text:
                negative_score += 1
                # Check for intensity modifiers
                if any(modifier in text for modifier in ['very', 'really', 'super', 'napaka']):
                    negative_score += 0.5

        # Consider negation
        negation_words = ['not', 'never', 'no', 'hindi', 'wala']
        if any(neg in text for neg in negation_words):
            # Swap scores in case of negation
            positive_score, negative_score = negative_score, positive_score

        # Determine final sentiment
        if positive_score > negative_score:
            return 'positive'
        elif negative_score > positive_score:
            return 'negative'
        else:
            return 'neutral'

    def create_dataloader(self, input_ids, attention_masks, labels, batch_size=16):
        """Create DataLoader for batch processing"""
        data = TensorDataset(input_ids, attention_masks, labels)
        return DataLoader(data, batch_size=batch_size, shuffle=True)

    def train(self, dataset_path: str):
        """Enhanced training with data augmentation and optimization"""
        print("Loading and preprocessing dataset...")
        dataset = pd.read_csv(dataset_path)

        # Preprocess and augment data
        processed_texts = []
        processed_labels = []

        print("Augmenting data...")
        for idx, row in tqdm(dataset.iterrows(), total=len(dataset)):
            # Preprocess original text
            text = self.preprocess_text(row['review'])

            # Augment data
            augmented_texts = self.augment_data(text)

            # Add original and augmented texts
            processed_texts.extend(augmented_texts)

            # Calculate sentiment for augmented texts
            sentiments = [self.analyze_sentiment(t) for t in augmented_texts]
            labels = [0 if s == 'negative' else 1 if s == 'positive' else 2 for s in sentiments]
            processed_labels.extend(labels)

        print("Tokenizing texts...")
        # Tokenize all processed texts
        encoded = self.tokenizer.batch_encode_plus(
            processed_texts,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )

        # Create dataloaders
        train_size = int(0.8 * len(processed_texts))
        train_dataloader = self.create_dataloader(
            encoded['input_ids'][:train_size],
            encoded['attention_mask'][:train_size],
            torch.tensor(processed_labels[:train_size])
        )

        val_dataloader = self.create_dataloader(
            encoded['input_ids'][train_size:],
            encoded['attention_mask'][train_size:],
            torch.tensor(processed_labels[train_size:])
        )

        # Training settings
        optimizer = torch.optim.AdamW(self.model.parameters(), lr=2e-5, weight_decay=0.01)

        # Learning rate scheduler
        total_steps = len(train_dataloader) * 5  # 5 epochs
        scheduler = get_linear_schedule_with_warmup(
            optimizer,
            num_warmup_steps=total_steps // 10,
            num_training_steps=total_steps
        )

        # Training loop with early stopping
        best_val_recall = 0
        patience = 3
        patience_counter = 0

        print("Starting training...")
        for epoch in range(5):
            print(f"\nEpoch {epoch + 1}/5")

            # Training
            self.model.train()
            total_loss = 0

            for batch in tqdm(train_dataloader, desc="Training"):
                batch = tuple(t.to(self.device) for t in batch)
                input_ids, attention_mask, labels = batch

                optimizer.zero_grad()
                outputs = self.model(
                    input_ids,
                    attention_mask=attention_mask,
                    labels=labels
                )

                loss = outputs.loss
                total_loss += loss.item()

                loss.backward()
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), 1.0)
                optimizer.step()
                scheduler.step()

            avg_train_loss = total_loss / len(train_dataloader)
            print(f"Average training loss: {avg_train_loss:.4f}")

            # Validation
            self.model.eval()
            val_predictions = []
            val_true_labels = []

            print("Running validation...")
            with torch.no_grad():
                for batch in tqdm(val_dataloader, desc="Validation"):
                    batch = tuple(t.to(self.device) for t in batch)
                    input_ids, attention_mask, labels = batch

                    outputs = self.model(input_ids, attention_mask=attention_mask)
                    predictions = torch.argmax(outputs.logits, dim=1)

                    val_predictions.extend(predictions.cpu().numpy())
                    val_true_labels.extend(labels.cpu().numpy())

            # Calculate validation metrics
            val_recall = recall_score(val_true_labels, val_predictions, average='macro')
            val_precision = precision_score(val_true_labels, val_predictions, average='macro')
            val_f1 = f1_score(val_true_labels, val_predictions, average='macro')

            print(f"Validation Metrics - Recall: {val_recall:.4f}, Precision: {val_precision:.4f}, F1: {val_f1:.4f}")

            # Early stopping check
            if val_recall > best_val_recall:
                best_val_recall = val_recall
                patience_counter = 0
                # Save the best model
                torch.save(self.model.state_dict(), 'best_model.pt')
            else:
                patience_counter += 1

            if patience_counter >= patience:
                print(f"Early stopping triggered at epoch {epoch + 1}")
                break

        # Load the best model
        self.model.load_state_dict(torch.load('best_model.pt'))
        print("Training completed!")

    def evaluate(self, dataset_path: str) -> Dict:
        """Enhanced evaluation with comprehensive metrics"""
        print("Starting evaluation...")
        dataset = pd.read_csv(dataset_path)
        processed_texts = [self.preprocess_text(text) for text in dataset['review']]

        # Tokenize
        encoded = self.tokenizer.batch_encode_plus(
            processed_texts,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )

        # Create labels
        labels = [0 if s == 'negative' else 1 if s == 'positive' else 2
                 for s in dataset['review'].apply(self.analyze_sentiment)]

        # Create DataLoader for evaluation
        eval_dataloader = self.create_dataloader(
            encoded['input_ids'],
            encoded['attention_mask'],
            torch.tensor(labels),
            batch_size=32
        )

        # Evaluate
        self.model.eval()
        all_predictions = []
        all_labels = []

        print("Running predictions...")
        with torch.no_grad():
            for batch in tqdm(eval_dataloader, desc="Evaluating"):
                batch = tuple(t.to(self.device) for t in batch)
                input_ids, attention_mask, batch_labels = batch

                outputs = self.model(input_ids, attention_mask=attention_mask)
                predictions = torch.argmax(outputs.logits, dim=1)

                all_predictions.extend(predictions.cpu().numpy())
                all_labels.extend(batch_labels.cpu().numpy())

        # Calculate comprehensive metrics
        metrics = {
            'accuracy': accuracy_score(all_labels, all_predictions),
            'recall': recall_score(all_labels, all_predictions, average='macro'),
            'precision': precision_score(all_labels, all_predictions, average='macro'),
            'f1_score': f1_score(all_labels, all_predictions, average='macro'),
            'matthews_correlation_coefficient': matthews_corrcoef(all_labels, all_predictions)
        }

        # Calculate per-class metrics
        labels_set = sorted(set(all_labels))
        for idx, label in enumerate(['negative', 'positive', 'neutral']):
            metrics.update({
                f'{label}_recall': recall_score(all_labels, all_predictions, labels=[idx], average='micro'),
                f'{label}_precision': precision_score(all_labels, all_predictions, labels=[idx], average='micro'),
                f'{label}_f1': f1_score(all_labels, all_predictions, labels=[idx], average='micro')
            })

        print("\nEvaluation Results:")
        for metric, value in metrics.items():
            print(f"{metric}: {value:.4f}")

        return metrics

    def analyze_feedback(self, feedback: str) -> Dict:
        """Enhanced feedback analysis with confidence scores"""
        # Preprocess the text
        processed_text = self.preprocess_text(feedback)

        # Detect language
        lang = self.detect_language(processed_text)

        # Identify aspects
        aspects = self.identify_aspects(processed_text, lang)

        # Prepare for model inference
        encoded = self.tokenizer.encode_plus(
            processed_text,
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )

        # Get model prediction
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(
                encoded['input_ids'].to(self.device),
                attention_mask=encoded['attention_mask'].to(self.device)
            )
            probabilities = torch.softmax(outputs.logits, dim=1)
            prediction = torch.argmax(probabilities, dim=1).item()
            confidence = probabilities[0][prediction].item()

        # Map prediction to sentiment
        sentiment_map = {0: 'negative', 1: 'positive', 2: 'neutral'}
        sentiment = sentiment_map[prediction]

        return {
            'language': 'Tagalog' if lang == 'tl' else 'English',
            'aspects': aspects,
            'sentiment': sentiment,
            'confidence': confidence,
            'text': feedback
        }

    def batch_analyze(self, feedbacks: List[str]) -> List[Dict]:
        """Batch analysis with progress tracking"""
        print(f"Analyzing {len(feedbacks)} feedbacks...")
        results = []

        for feedback in tqdm(feedbacks, desc="Analyzing feedbacks"):
            try:
                result = self.analyze_feedback(feedback)
                results.append(result)
            except Exception as e:
                print(f"Error analyzing feedback: {feedback[:50]}... Error: {str(e)}")
                results.append({
                    'text': feedback,
                    'error': str(e)
                })

        return results

    def save(self, path: str):
        """Save the model and tokenizer"""
        self.model.save_pretrained(path)
        self.tokenizer.save_pretrained(path)
        print(f"Model saved to {path}")

    def load(self, path: str):
        """Load a saved model and tokenizer"""
        self.model = BertForSequenceClassification.from_pretrained(path)
        self.tokenizer = BertTokenizer.from_pretrained(path)
        self.model.to(self.device)
        print(f"Model loaded from {path}")

# Example usage
if __name__ == "__main__":
    # Initialize analyzer
    analyzer = ImprovedVetFeedbackAnalyzer()

    # Train the model
    print("Training model...")
    analyzer.train('rows_cleaned.csv')

    # Evaluate the model
    print("\nEvaluating model...")
    metrics = analyzer.evaluate('rows_cleaned.csv')

    # Test some example feedback
    test_feedbacks = [
        "The vet was very professional and caring. The clinic was clean but the waiting time was too long.",
        "Ang galing ng doctor! Malinis ang clinic at mabait ang staff.",
        "Poor service, expensive fees, and the place was dirty.",
    ]

    print("\nTesting example feedbacks:")
    results = analyzer.batch_analyze(test_feedbacks)
    for result in results:
        print("\nFeedback Analysis:")
        print(f"Text: {result['text']}")
        print(f"Language: {result['language']}")
        print(f"Sentiment: {result['sentiment']} (Confidence: {result.get('confidence', 'N/A'):.3f})")
        print(f"Aspects: {', '.join(result['aspects'])}")