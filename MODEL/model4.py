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
                # Provide feedback on sentiment intensity
                if len(re.findall(pos_word, text)) > 1:
                    positive_score += 1  # Boost score for repetition
        for neg_word in self.sentiment_rules['negative'][lang]:
            if neg_word in text:
                negative_score += 1
                # Provide feedback on sentiment intensity
                if len(re.findall(neg_word, text)) > 1:
                    negative_score += 1  # Boost score for repetition

        # Determine final sentiment based on scores
        if positive_score > negative_score:
            return 'positive'
        elif negative_score > positive_score:
            return 'negative'
        else:
            return 'neutral'

    def train_model(self, train_data: pd.DataFrame, epochs: int = 3, batch_size: int = 8, learning_rate: float = 5e-5):
        """Train the model using enhanced techniques"""
        # Tokenize data
        texts = train_data['feedback'].apply(self.preprocess_text).tolist()
        labels = train_data[['hygiene', 'waiting_time', 'customer_service', 'vet_care', 'pricing']].values
        input_ids = []
        attention_masks = []

        for text in texts:
            encoding = self.tokenizer(text, truncation=True, padding='max_length', max_length=128, return_tensors='pt')
            input_ids.append(encoding['input_ids'][0])
            attention_masks.append(encoding['attention_mask'][0])

        # Convert data to tensor
        input_ids = torch.stack(input_ids)
        attention_masks = torch.stack(attention_masks)
        labels = torch.tensor(labels).float()  # Ensure labels are float for BCEWithLogitsLoss

        # Create dataloader
        train_dataset = TensorDataset(input_ids, attention_masks, labels)
        train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

        # Set optimizer and scheduler
        optimizer = torch.optim.AdamW(self.model.parameters(), lr=learning_rate)
        scheduler = get_linear_schedule_with_warmup(
            optimizer, num_warmup_steps=0, num_training_steps=len(train_dataloader) * epochs
        )

        # Loss function
        loss_fn = torch.nn.BCEWithLogitsLoss()

        # Training loop
        self.model.train()
        for epoch in range(epochs):
            total_loss = 0
            for batch in tqdm(train_dataloader, desc=f"Epoch {epoch+1}/{epochs}"):
                batch = tuple(t.to(self.device) for t in batch)
                input_ids, attention_mask, labels = batch

                optimizer.zero_grad()

                # Forward pass
                outputs = self.model(input_ids, attention_mask=attention_mask)

                # Calculate loss
                loss = loss_fn(outputs.logits, labels)
                total_loss += loss.item()

                # Backward pass
                loss.backward()
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), 1.0)
                optimizer.step()
                scheduler.step()

            print(f"Epoch {epoch+1} Loss: {total_loss / len(train_dataloader)}")

    def evaluate_model(self, test_data: pd.DataFrame) -> Dict[str, float]:
        """Evaluate the model using accuracy and other metrics"""
        texts = test_data['feedback'].apply(self.preprocess_text).tolist()
        labels = test_data[['hygiene', 'waiting_time', 'customer_service', 'vet_care', 'pricing']].values
        input_ids = []
        attention_masks = []

        for text in texts:
            encoding = self.tokenizer(text, truncation=True, padding='max_length', max_length=128, return_tensors='pt')
            input_ids.append(encoding['input_ids'][0])
            attention_masks.append(encoding['attention_mask'][0])

        input_ids = torch.stack(input_ids)
        attention_masks = torch.stack(attention_masks)
        labels = torch.tensor(labels).float()

        # Create dataloader
        test_dataset = TensorDataset(input_ids, attention_masks, labels)
        test_dataloader = DataLoader(test_dataset, batch_size=8)

        # Set model to evaluation mode
        self.model.eval()

        all_preds = []
        all_labels = []

        with torch.no_grad():
            for batch in tqdm(test_dataloader, desc="Evaluating"):
                batch = tuple(t.to(self.device) for t in batch)
                input_ids, attention_mask, labels = batch

                # Forward pass
                outputs = self.model(input_ids, attention_mask=attention_mask)

                # Get predictions (thresholded)
                preds = torch.sigmoid(outputs.logits) > 0.5
                all_preds.append(preds.cpu().numpy())
                all_labels.append(labels.cpu().numpy())

        # Flatten the predictions and labels
        all_preds = np.concatenate(all_preds, axis=0)
        all_labels = np.concatenate(all_labels, axis=0)

        # Calculate metrics
        accuracy = accuracy_score(all_labels, all_preds)
        precision = precision_score(all_labels, all_preds, average='micro')
        recall = recall_score(all_labels, all_preds, average='micro')
        f1 = f1_score(all_labels, all_preds, average='micro')
        mcc = matthews_corrcoef(all_labels.flatten(), all_preds.flatten())

        return {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1_score': f1,
            'mcc': mcc
        }
