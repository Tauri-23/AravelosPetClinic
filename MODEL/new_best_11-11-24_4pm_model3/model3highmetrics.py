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
from collections import defaultdict, Counter
import re
import string
import random
import json


class VetFeedbackAnalyzer:
    def __init__(self, batch_size=16):
        self.batch_size = batch_size
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        # print(f"Using device: {self.device}")

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
                'en': ['staff', 'service', 'friendly', 'rude', 'helpful', 'attentive','team','employee','employees'],
                'tl': ['kawani', 'serbisyo', 'magalang', 'bastos', 'matulungin','tauhan']
            },
            'vet_care': {
                'en': ['treatment', 'doctor', 'vet', 'examination', 'diagnosis', 'care','veterinarians','physicians'],
                'tl': ['gamot', 'doktor', 'beterinaryo', 'eksamin', 'alaga']
            },
            'pricing': {
                'en': ['price', 'expensive', 'cheap', 'cost', 'affordable', 'fee'],
                'tl': ['presyo', 'mahal', 'mura', 'halaga', 'bayad']
            },
             'booking_experience': {
                'en': ['book', 'appointment', 'schedule', 'reservation', 'slot', 'available', 'unavailable', 'full', 'online', 'phone', 'call'],
                'tl': ['reserba', 'iskedyul', 'tawag', 'puno', 'bakante']
            }
        }

        self.sentiment_rules = {
            'positive': {
                'en': ['good', 'great','greatest', 'amazing', 'excellent', 'awesome', 'satisfied', 'happy', 'clean', 'neat', 'tidy', 'pristine', 'fresh',
                        'spotless', 'hygienic', 'sterile', 'orderly', 'sanitary', 'quick', 'fast', 'efficient', 'nice', 'pleasant',
                        'friendly', 'helpful', 'attentive', 'compassionate', 'knowledgeable', 'skilled', 'responsive', 'professional',
                        'respectful', 'welcoming', 'understanding', 'timely', 'swift', 'thorough', 'reliable', 'gentle',
                        'trustworthy', 'caring', 'dedicated', 'reputable', 'affordable', 'fair', 'justifiable', 'budget friendly',
                        'compassionate', 'minimal', 'short', 'prompt', 'value based', 'cost effective', 'patient focused', 'accessible',
                        'competitive', 'organized', 'manageable', 'supportive', 'proactive', 'empathetic', 'speedy', 'commendable','cooperative','polite','well trained'
                    ],
                'tl': ['maganda', 'mahusay', 'pinakamagaling','masaya', 'kontento', 'magaling', 'malinis', 'maayos', 'mura', 'makatarungan', 'mabait',
                        'mabilis', 'mabisa', 'matulungin', 'mapagkalinga', 'maalaga', 'mapagmalasakit', 'maaasahan', 'masinsin',
                        'maingat', 'matapat', 'kaaya aya', 'mapag unawa', 'masinop', 'maalwan', 'madaling lapitan', 'malinaw', 'maaliwalas',
                        'malambing', 'mapag aruga', 'kagalang galang', 'maasikaso', 'masipag', 'mapagbigay', 'mapagpakumbaba',
                        'malasakit', 'marespeto', 'masigla', 'maingat', 'matapat', 'makonsiderasyon', 'mabango', 'maasikaso',
                        'nakikiramay','napakagaling','napakamatulungin','napakabait','propesyunal','propesyonal','magalang','husay','madali'
                    ]
            },
            'negative': {
                'en': ['bad', 'poor', 'terrible', 'worst', 'disappointed', 'horrible', 'expensive', 'dirty', 'filthy', 'unkempt',
                        'unsanitary', 'smelly', 'foul', 'contaminated', 'grimy', 'negligent', 'rude', 'unhelpful', 'impatient',
                        'disrespectful', 'inattentive', 'unresponsive', 'unprofessional', 'cold', 'dismissive', 'indifferent',
                        'slow', 'condescending', 'unreliable', 'inconsiderate', 'long', 'extended', 'delayed', 'excessive',
                        'unreasonable', 'frustrating', 'tedious', 'prolonged', 'rough', 'inconsistent', 'rushed',
                        'impersonal', 'hidden fees', 'overpriced', 'inflated', 'steep', 'costly', 'unaffordable', 'exorbitant', 'awful', 'disgusting',
                        'not transparent', 'too much', 'not cleaned', 'unclean', 'increasing', 'high', 'extra', 'double the price',
                        'huge amount', 'unacceptable', 'ridiculous', 'shocked', 'ignored', 'not empathetic', 'unorganized', 'unwelcome',
                        'stressful', 'lied'
                    ],
                'tl': ['pangit', 'masama', 'hindi maganda', 'hindi mahusay', 'malala', 'marumi', 'magulo', 'mahal', 'marahas',
                        'mabagal', 'matagal', 'nakakainis', 'mabaho', 'makalat', 'hindi maayos', 'palpak', 'bastos', 'hindi magalang',
                        'pabaya', 'walang malasakit', 'mapagsamantala', 'walang pakialam', 'hindi makatwiran', 'hindi kaaya-aya',
                        'nakakadismaya', 'hindi sigurado', 'pasaway', 'magulo', 'magaspang', 'mapanlait', 'palpak', 'masalimoot',
                        'mapagsamantala', 'walang malasakit', 'hindi kapani paniwala', 'madamot', 'masikip', 'mahirap lapitan',
                        'hindi marespeto', 'nakakasakit', 'mapanlinlang', 'katakot', 'nakakatakot', 'nakakadiri', 'di nagsasabi',
                        'di sinasabi', 'sobra', 'hindi nalinis', 'hindi malinis', 'padagdag', 'taas', 'dagdag', 'doble',
                        'malaking halaga', 'hindi katanggap tanggap', 'nakakagulat', 'hindi ako pinansin', 'nagsinungaling', 'hindi'
                    ]
            },
            'neutral': {
                'en': ['okay', 'average', 'normal', 'standard', 'typical', 'moderate', 'fair', 'regular', 'common', 'usual',
                       'ordinary', 'basic', 'acceptable', 'decent', 'mediocre', 'middle', 'intermediate', 'medium', 'so so',
                       'alright', 'fine', 'satisfactory', 'adequate', 'sufficient', 'passable', 'tolerable', 'reasonable',
                       'conventional', 'routine', 'customary', 'neutral', 'but', 'could', 'neither', 'bit'
                    ],
                'tl': ['pwede na', 'sakto', 'katamtaman', 'karaniwan', 'pangkaraniwan', 'karaniwang', 'tama lang',
                       'sapat', 'kasya', 'kainaman', 'hindi masama', 'pwede pa', 'ganun', 'ganon',
                       'hindi naman masama', 'hindi naman maganda', 'ayos lang', 'ok lang', 'puwede na', 'pero', 'pwede', 'ngunit',
                       'okay naman', 'ayos', 'medyo', 'katamtaman'
                    ]
            }
        }
        self.model_info = {
            'path': None,
            'format': None,  # 'old' or 'new'
            'epoch': None,
            'timestamp': None
        }
        self.stopwords = {
            'en': {'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
                  'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will',
                  'with', 'the', 'this', 'but', 'they', 'have', 'had', 'what', 'when', 'where',
                  'who', 'which', 'why', 'how'},
            'tl': {'ang', 'mga', 'sa', 'na', 'ng', 'at', 'ay', 'ko', 'mo', 'niya', 'ito', 'po',
                   'para', 'siya', 'nila', 'namin', 'natin', 'kami', 'tayo', 'kayo', 'sila'}
        }
    
    

    def preprocess_text(self, text: str, lang: str) -> str:
        """Preprocess text by removing punctuation, numbers, and stopwords"""
        # Convert to lowercase
        text = text.lower()
        # Remove punctuation and numbers
        text = re.sub(f'[{string.punctuation}{string.digits}]', ' ', text)
        # Split into words
        words = text.split()
        # Remove stopwords
        words = [word for word in words if word not in self.stopwords[lang]]
        return ' '.join(words)
    
    
    
    def get_word_frequency(self, text: str, lang: str) -> int:
        """Calculate the frequency of repeated meaningful words"""
        processed_text = self.preprocess_text(text, lang)
        words = processed_text.split()
        word_counts = Counter(words)
        # Sum the counts of words that appear more than once
        return sum(count for count in word_counts.values() if count > 1)
    
    
    
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
        # print("Base BERT model loaded")
    
    
    
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
        """Rule-based sentiment analysis with improved negation handling"""
        lang = self.detect_language(text)
        text = text.lower()
        words = text.split()

        # Negation words with stronger impact
        negation_words = {
            'en': {'not', 'no', "don't", 'never', 'neither', 'none', 'without'},
            'tl': {'hindi', 'wala', 'ayaw', 'di', 'hinde', 'walang'}
        }

        # Initialize scores
        sentiment_score = 0
        negation_active = False

        # First check for complete negative phrases
        for neg_phrase in self.sentiment_rules['negative'][lang]:
            if neg_phrase in text:
                sentiment_score -= 3  # Even stronger negative score for complete phrases

        # Process words with context
        for i, word in enumerate(words):
            # Check for negation
            if word in negation_words[lang]:
                negation_active = True
                sentiment_score -= 1  # Negation itself contributes to negative score
                continue

            # Handle positive words
            if any(pos_word in word for pos_word in self.sentiment_rules['positive'][lang]):
                if negation_active:
                    sentiment_score -= 2  # Negated positive is strongly negative
                else:
                    sentiment_score += 1

            # Handle negative words
            if any(neg_word in word for neg_word in self.sentiment_rules['negative'][lang]):
                sentiment_score -= 2  # Negative words have stronger impact

            # Reset negation after 2 words
            if negation_active and i > 0 and (i % 2 == 0):
                negation_active = False

        # Determine final sentiment with more aggressive thresholds
        if sentiment_score < -1:  # Lower threshold for negative
            return 'negative'
        elif sentiment_score > 2:  # Higher threshold for positive
            return 'positive'
        else:
            # If there's any negation, lean towards negative
            if any(neg in text for neg in negation_words[lang]):
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
    
    
    
    #used
    def train(self, dataset_path: str, model_save_path: str, epochs=4):
        """Train model with handling for imbalanced data"""
        print("Starting training...")
        self._load_base_model()
        self.model.train()

        # Calculate initial class distribution
        print("Calculating initial class distribution...")
        initial_class_counts = defaultdict(int)
        
        for chunk in pd.read_csv(dataset_path, chunksize=self.batch_size):
            for sentiment in chunk['sentiment']:  # Using sentiment directly from dataset
                initial_class_counts[sentiment] += 1
        
        total_initial_samples = sum(initial_class_counts.values())
        
        print("\nInitial class distribution (before augmentation):")
        for cls, count in initial_class_counts.items():
            print(f"{cls}: {count} samples ({count/total_initial_samples*100:.2f}%)")

        # Calculate augmented distribution
        augmented_class_counts = initial_class_counts.copy()
        for sentiment in ['negative', 'neutral']:
            augmented_class_counts[sentiment] += initial_class_counts[sentiment] * 2  # Adding 2 augmented versions
        
        total_augmented_samples = sum(augmented_class_counts.values())
        
        print("\nAugmented class distribution (after augmentation):")
        for cls, count in augmented_class_counts.items():
            print(f"{cls}: {count} samples ({count/total_augmented_samples*100:.2f}%)")

        # Calculate class weights based on augmented distribution
        class_weights = {
            'negative': total_augmented_samples / (3 * augmented_class_counts['negative']),
            'positive': total_augmented_samples / (3 * augmented_class_counts['positive']),
            'neutral': total_augmented_samples / (3 * augmented_class_counts['neutral'])
        }

        print("\nClass weights:")
        for cls, weight in class_weights.items():
            print(f"{cls}: {weight:.2f}")

        # Convert class weights to tensor format
        weight_mapping = {'negative': 0, 'positive': 1, 'neutral': 2}
        class_weight_tensor = torch.tensor(
            [class_weights[k] for k in ['negative', 'positive', 'neutral']],
            device=self.device
        )

        # Initialize optimizer with weight decay
        self.optimizer = torch.optim.AdamW(
            self.model.parameters(),
            lr=2e-5,
            weight_decay=0.01  # L2 regularization
        )

        # Learning rate scheduler
        scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            self.optimizer,
            mode='min',
            factor=0.5,
            patience=2,
            verbose=True
        )

        best_metrics = None
        best_epoch = None
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base_save_path = f"{model_save_path}_{timestamp}"

        def augment_text(text: str, lang: str) -> str:
            """Simple text augmentation"""
            words = text.split()
            if len(words) < 3:
                return text

            # Random word dropout
            if random.random() < 0.3:
                drop_idx = random.randint(0, len(words)-1)
                words.pop(drop_idx)

            # Random word repetition for emphasis
            if random.random() < 0.3:
                repeat_idx = random.randint(0, len(words)-1)
                words.insert(repeat_idx, words[repeat_idx])

            return ' '.join(words)

        for epoch in range(epochs):
            total_loss = 0
            batch_count = 0

            # Training loop with augmentation for minority classes
            for chunk in tqdm(pd.read_csv(dataset_path, chunksize=self.batch_size),
                            desc=f'Epoch {epoch+1}/{epochs}'):
                texts = []
                labels = []

                for text in chunk['review']:
                    sentiment = self.analyze_sentiment(text)
                    lang = self.detect_language(text)
                    label = weight_mapping[sentiment]

                    # Add original sample
                    texts.append(text)
                    labels.append(label)

                    # Augment minority classes
                    if sentiment in ['negative', 'neutral']:  # assuming these are minority classes
                        # Add augmented versions
                        for _ in range(2):  # Create 2 augmented versions
                            aug_text = augment_text(text, lang)
                            texts.append(aug_text)
                            labels.append(label)

                # Process batch with weighted loss
                encoded = self.tokenizer(
                    texts,
                    padding=True,
                    truncation=True,
                    max_length=128,
                    return_tensors='pt'
                )

                input_ids = encoded['input_ids'].to(self.device)
                attention_mask = encoded['attention_mask'].to(self.device)
                label_tensor = torch.tensor(labels).to(self.device)

                self.optimizer.zero_grad()
                outputs = self.model(
                    input_ids,
                    attention_mask=attention_mask,
                    labels=label_tensor
                )

                # Apply class weights to loss
                loss = outputs.loss * class_weight_tensor[label_tensor].mean()

                loss.backward()

                # Gradient clipping
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)

                self.optimizer.step()

                total_loss += loss.item()
                batch_count += 1

                del input_ids, attention_mask, outputs, label_tensor
                torch.cuda.empty_cache() if self.device.type == 'cuda' else None
                gc.collect()

            avg_loss = total_loss / batch_count
            print(f'Epoch {epoch+1} - Average loss: {avg_loss:.4f}')

            # Update learning rate
            scheduler.step(avg_loss)

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


        def get_sentiment_score(text: str) -> float:
            """Get sentiment score based on keyword presence"""
            lang = self.detect_language(text)
            text = text.lower()

            # Count positive and negative signals
            pos_signals = sum(word in text for word in self.sentiment_rules['positive'][lang])
            neg_signals = sum(word in text for word in self.sentiment_rules['negative'][lang])

            # Get sentiment strength (-1 to 1)
            total = pos_signals + neg_signals
            if total == 0:
                return 0.0
            return (pos_signals - neg_signals) / total

        def get_sentiment_label(score: float) -> int:
            """Convert score to label with some uncertainty"""
            if score > 0.2:  # Positive threshold
                return 1
            elif score < -0.2:  # Negative threshold
                return 0
            return 2  # Neutral

        for epoch in range(epochs):
            total_loss = 0
            batch_count = 0

            for chunk in tqdm(pd.read_csv(dataset_path, chunksize=self.batch_size),
                            desc=f'Epoch {epoch+1}/{epochs}'):
                texts = chunk['review'].tolist()

                # Get initial sentiment signals from keywords
                sentiment_scores = [get_sentiment_score(text) for text in texts]
                labels = [get_sentiment_label(score) for score in sentiment_scores]

                # Train batch with soft labels
                encoded = self.tokenizer(
                    texts,
                    padding=True,
                    truncation=True,
                    max_length=128,
                    return_tensors='pt'
                )

                input_ids = encoded['input_ids'].to(self.device)
                attention_mask = encoded['attention_mask'].to(self.device)
                label_tensor = torch.tensor(labels).to(self.device)

                self.optimizer.zero_grad()
                outputs = self.model(
                    input_ids,
                    attention_mask=attention_mask,
                    labels=label_tensor
                )

                # Add confidence weighting based on keyword presence
                loss = outputs.loss * torch.tensor(
                    [abs(score) + 0.5 for score in sentiment_scores],
                    device=self.device
                ).mean()

                loss.backward()
                self.optimizer.step()

                total_loss += loss.item()
                batch_count += 1

                del input_ids, attention_mask, outputs, label_tensor
                torch.cuda.empty_cache() if self.device.type == 'cuda' else None
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
    
    
    
    #used
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
    
    
    
    def collect_aspect_statistics(self, dataset_path: str, aspect: str) -> Dict:
        """Collect statistics for a specific aspect from the dataset"""
        print(f"\nAnalyzing {aspect} reviews...")

        total_reviews = 0
        aspect_stats = {'positive': 0, 'negative': 0, 'neutral': 0}
        top_comments = {'positive': [], 'negative': [], 'neutral': []}

        # Process in batches
        for chunk in tqdm(pd.read_csv(dataset_path, chunksize=self.batch_size),
                         desc='Processing reviews'):
            for _, row in chunk.iterrows():
                text = row['review']
                lang = self.detect_language(text)
                aspects = self.identify_aspects(text, lang)

                if aspect in aspects:
                    total_reviews += 1
                    # Get sentiment prediction
                    encoded = self.tokenizer(
                        text,
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
                        sentiment = ['negative', 'positive', 'neutral'][prediction]
                        aspect_stats[sentiment] += 1

                        # Add to top comments with word frequency
                        word_freq = self.get_word_frequency(text, lang)
                        top_comments[sentiment].append((text, word_freq))

                    del input_ids, attention_mask, outputs
                    torch.cuda.empty_cache() if self.device.type == 'cuda' else None

            gc.collect()

        # Sort and get top 5 comments for each sentiment
        for sentiment in top_comments:
            top_comments[sentiment] = sorted(top_comments[sentiment],
                                          key=lambda x: x[1],
                                          reverse=True)[:5]

        # Calculate percentages
        stats = {
            'total': total_reviews,
            'positive': {
                'count': aspect_stats['positive'],
                'percentage': (aspect_stats['positive'] / total_reviews * 100) if total_reviews > 0 else 0,
                'top_comments': top_comments['positive']
            },
            'neutral': {
                'count': aspect_stats['neutral'],
                'percentage': (aspect_stats['neutral'] / total_reviews * 100) if total_reviews > 0 else 0,
                'top_comments': top_comments['neutral']
            },
            'negative': {
                'count': aspect_stats['negative'],
                'percentage': (aspect_stats['negative'] / total_reviews * 100) if total_reviews > 0 else 0,
                'top_comments': top_comments['negative']
            }
        }

        return stats
    
    
    
    def collect_all_aspect_statistics(self, dataset_path: str) -> Dict[str, Dict]:
        """Collect statistics for all aspects from the dataset"""
        # print("\nAnalyzing all aspects...")

        aspects = ['hygiene', 'waiting_time', 'customer_service', 'booking_experience', 'vet_care', 'pricing']
        all_stats = {}

        # Initialize statistics for each aspect
        aspect_reviews = {aspect: {
            'total': 0,
            'positive': 0,
            'negative': 0,
            'neutral': 0,
            'top_comments': {'positive': [], 'negative': [], 'neutral': []}
        } for aspect in aspects}

        # Process in batches
        for chunk in tqdm(pd.read_csv(dataset_path, chunksize=self.batch_size),
                         desc='Processing reviews'):
            for _, row in chunk.iterrows():
                text = row['review']
                lang = self.detect_language(text)
                review_aspects = self.identify_aspects(text, lang)

                # Get sentiment prediction once for this review
                encoded = self.tokenizer(
                    text,
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
                    sentiment = ['negative', 'positive', 'neutral'][prediction]

                    # Get word frequency once
                    word_freq = self.get_word_frequency(text, lang)

                    # Update statistics for each aspect found in this review
                    for aspect in review_aspects:
                        if aspect in aspects:  # Skip 'general' aspect
                            aspect_reviews[aspect]['total'] += 1
                            aspect_reviews[aspect][sentiment] += 1
                            aspect_reviews[aspect]['top_comments'][sentiment].append((text, word_freq))

                    del input_ids, attention_mask, outputs
                    torch.cuda.empty_cache() if self.device.type == 'cuda' else None

            gc.collect()

        # Calculate percentages and format statistics for each aspect
        for aspect in aspects:
            # Sort and get top 5 comments for each sentiment
            top_comments = {
                sentiment: sorted(aspect_reviews[aspect]['top_comments'][sentiment],
                                key=lambda x: x[1],
                                reverse=True)
                for sentiment in ['positive', 'negative', 'neutral']
            }

            total = aspect_reviews[aspect]['total']
            all_stats[aspect] = {
                'total': total,
                'positive': {
                    'count': aspect_reviews[aspect]['positive'],
                    'percentage': (aspect_reviews[aspect]['positive'] / total * 100) if total > 0 else 0,
                    'top_comments': top_comments['positive']
                },
                'neutral': {
                    'count': aspect_reviews[aspect]['neutral'],
                    'percentage': (aspect_reviews[aspect]['neutral'] / total * 100) if total > 0 else 0,
                    'top_comments': top_comments['neutral']
                },
                'negative': {
                    'count': aspect_reviews[aspect]['negative'],
                    'percentage': (aspect_reviews[aspect]['negative'] / total * 100) if total > 0 else 0,
                    'top_comments': top_comments['negative']
                }
            }

        return all_stats
    
    
    
    def display_aspect_statistics(self, stats: Dict):
        """Display statistics for an aspect in a formatted way"""
        print(f"\nPositive Reviews: {stats['positive']['count']} ({stats['positive']['percentage']:.1f}%)")
        print("Top 5 Positive Comments:")
        for comment, freq in stats['positive']['top_comments']:
            print(f"- {comment}")

        print(f"\nNeutral Reviews: {stats['neutral']['count']} ({stats['neutral']['percentage']:.1f}%)")
        print("Top 5 Neutral Comments:")
        for comment, freq in stats['neutral']['top_comments']:
            print(f"- {comment}")

        print(f"\nNegative Reviews: {stats['negative']['count']} ({stats['negative']['percentage']:.1f}%)")
        print("Top 5 Negative Comments:")
        for comment, freq in stats['negative']['top_comments']:
            print(f"- {comment}")

        print(f"\nTotal Reviews: {stats['total']}")
    
    
    
    def display_all_aspect_statistics(self, all_stats: Dict[str, Dict]):
        """Display statistics for all aspects in a formatted way"""
        for aspect, stats in all_stats.items():
            print(f"\n{aspect.capitalize()}:")
            print("=" * 80)
            self.display_aspect_statistics(stats)
            print("=" * 80)
    
    
    
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
    
    
    
    def balance_dataset(self, input_path: str, output_path: str):
        """Balance dataset by augmenting minority classes"""
        print("Starting dataset balancing...")

        # Read the entire dataset
        df = pd.read_csv(input_path)
        print(f"Original dataset size: {len(df)} samples")

        # Get sentiment distribution
        df['sentiment'] = df['review'].apply(self.analyze_sentiment)
        sentiment_counts = df['sentiment'].value_counts()

        print("\nOriginal class distribution:")
        for sentiment, count in sentiment_counts.items():
            print(f"{sentiment}: {count} samples")

        # Find majority class count
        max_count = sentiment_counts.max()

        # Initialize list for balanced data
        balanced_data = []

        # Process each sentiment class
        for sentiment in ['positive', 'negative', 'neutral']:
            sentiment_df = df[df['sentiment'] == sentiment]
            current_count = len(sentiment_df)

            # Add original samples
            balanced_data.extend(sentiment_df.to_dict('records'))

            # Calculate how many more samples we need
            samples_needed = max_count - current_count

            if samples_needed > 0:
                print(f"\nAugmenting {sentiment} class with {samples_needed} samples...")

                # Augment data until we reach the majority class count
                while len(balanced_data) < len(df) + samples_needed:
                    # Randomly select a sample to augment
                    sample = sentiment_df.sample(n=1).iloc[0]
                    text = sample['review']
                    lang = self.detect_language(text)

                    # Apply augmentation
                    words = text.split()
                    if len(words) >= 3:
                        # Random word dropout
                        if random.random() < 0.3:
                            drop_idx = random.randint(0, len(words)-1)
                            words.pop(drop_idx)

                        # Random word repetition for emphasis
                        if random.random() < 0.3:
                            repeat_idx = random.randint(0, len(words)-1)
                            words.insert(repeat_idx, words[repeat_idx])

                        # Random word order swap
                        if random.random() < 0.3 and len(words) >= 4:
                            idx1 = random.randint(0, len(words)-2)
                            words[idx1], words[idx1+1] = words[idx1+1], words[idx1]

                        augmented_text = ' '.join(words)

                        # Add augmented sample
                        augmented_sample = sample.copy()
                        augmented_sample['review'] = augmented_text
                        balanced_data.append(augmented_sample)

        # Create balanced dataset
        balanced_df = pd.DataFrame(balanced_data)

        # Shuffle the dataset
        balanced_df = balanced_df.sample(frac=1).reset_index(drop=True)

        # Save balanced dataset
        balanced_df.to_csv(output_path, index=False)

        print("\nFinal class distribution:")
        final_counts = balanced_df['sentiment'].value_counts()
        for sentiment, count in final_counts.items():
            print(f"{sentiment}: {count} samples")

        print(f"\nBalanced dataset saved to: {output_path}")
        print(f"Total samples: {len(balanced_df)}")



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
    base_model_path = "../"

    while True:
        print("\nVet Feedback Analysis System")
        print("Current Model:", analyzer.get_model_status())
        print("\n1. Train model")
        print("2. Load model")
        print("3. Test model")
        print("4. View accuracy metrics")
        print("5. View Statistics")
        print("6. Balance dataset")
        print("7. Exit")

        choice = input("\nEnter your choice (1-7): ")
        if choice == '1':
                dataset_path = input("Enter dataset path (CSV file): ")
                model_save_path = input("Enter path to save model: ")
                try:
                    analyzer.train(dataset_path, model_save_path)
                except Exception as e:
                    print(f"Error during training: {str(e)}")
        elif choice == '2':
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
            if analyzer.is_base_model:
                print("\nWarning: Using untrained base model. Results may not be meaningful.")
                proceed = input("Do you want to proceed anyway? (y/n): ")
                if proceed.lower() != 'y':
                    continue

            dataset_path = input("Enter dataset path for analysis: ")

            print("\nAspects:")
            aspects = ['hygiene', 'waiting_time', 'customer_service', 'vet_care', 'pricing']
            print("0. All aspects")
            for i, aspect in enumerate(aspects, 1):
                print(f"{i}. {aspect}")

            try:
                aspect_choice = int(input("\nChoose aspect (0-5): "))
                if aspect_choice == 0:
                    print("\nAll Aspects Statistics:")
                    all_stats = analyzer.collect_all_aspect_statistics(dataset_path)
                    analyzer.display_all_aspect_statistics(all_stats)
                elif 1 <= aspect_choice <= len(aspects):
                    chosen_aspect = aspects[aspect_choice-1]
                    print(f"\n{chosen_aspect.capitalize()}:")
                    stats = analyzer.collect_aspect_statistics(dataset_path, chosen_aspect)
                    analyzer.display_aspect_statistics(stats)
                else:
                    print("Invalid aspect choice!")
            except ValueError:
                print("Please enter a valid number")
            except Exception as e:
                print(f"Error during statistics collection: {str(e)}")

        elif choice == '6':
            input_path = input("Enter input dataset path (CSV file): ")
            output_path = input("Enter output path for balanced dataset (CSV file): ")
            try:
                analyzer.balance_dataset(input_path, output_path)
            except Exception as e:
                print(f"Error during dataset balancing: {str(e)}")

        elif choice == '7':
            print("Goodbye!")
            break

        else:
            print("Invalid choice! Please enter a number between 1 and 7.")



if __name__ == "__main__":
    # main()

    script_dir = os.path.dirname(os.path.abspath(__file__))  # Get the directory of the script
    dataset_path = os.path.join(script_dir, "..", "cleaned_by_code.csv")  # Resolve to absolute path
    base_model_path = os.path.join(script_dir, "../")
    analyzer = VetFeedbackAnalyzer()

    aspects = ['hygiene', 'waiting_time', 'customer_service', 'booking_experience', 'vet_care', 'pricing']

    # print(dataset_path)

    try:
        aspect_choice = 0
        if aspect_choice == 0:
            all_stats = analyzer.collect_all_aspect_statistics(dataset_path)
            print(json.dumps(all_stats))
            # analyzer.display_all_aspect_statistics(all_stats)
        elif 1 <= aspect_choice <= len(aspects):
            chosen_aspect = aspects[aspect_choice-1]
            stats = analyzer.collect_aspect_statistics(dataset_path, chosen_aspect)
            analyzer.display_aspect_statistics(stats)
        else:
            print("Invalid aspect choice!")
    except ValueError:
        print("Please enter a valid number")
    except Exception as e:
        print(f"Error during statistics collection: {str(e)}")
