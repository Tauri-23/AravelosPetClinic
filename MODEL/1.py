import torch
from transformers import BertTokenizer, BertForSequenceClassification
import numpy as np
from typing import List, Dict

class VetFeedbackAnalyzer:
    def __init__(self):
        # Initialize mBERT tokenizer and model
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')
        self.model = BertForSequenceClassification.from_pretrained(
            'bert-base-multilingual-cased',
            num_labels=3  # positive, neutral, negative
        )

        # Aspect keywords for both English and Tagalog
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

        # Sentiment rules
        self.sentiment_rules = {
            'positive': {
                'en': ['good', 'great', 'excellent', 'awesome', 'satisfied', 'happy', 'best', 'clean', 'friendly'],
                'tl': ['maganda', 'mahusay', 'masaya', 'kontento', 'magaling', 'ayos', 'mabait']
            },
            'negative': {
                'en': ['bad', 'poor', 'terrible', 'worst', 'disappointed', 'horrible', 'expensive', 'not satisfied'],
                'tl': ['pangit', 'masama', 'hindi maganda', 'hindi mahusay', 'malala', 'mahal', 'tagal']
            }
        }

    def detect_language(self, text: str) -> str:
        """Detect if text is primarily English or Tagalog based on keyword matching"""
        tagalog_markers = set(['ang', 'ng', 'mga', 'sa', 'na', 'at'])
        words = text.lower().split()
        tagalog_count = sum(1 for word in words if word in tagalog_markers)
        return 'tl' if tagalog_count / len(words) > 0.1 else 'en'

    def identify_aspects(self, text: str, lang: str) -> List[str]:
        """Identify which aspects are mentioned in the text"""
        text = text.lower()
        aspects = []

        for aspect, keywords in self.aspect_keywords.items():
            if any(keyword in text for keyword in keywords[lang]):
                aspects.append(aspect)

        return aspects if aspects else ['general']

    def analyze_sentiment(self, text: str, lang: str) -> str:
        """Analyze sentiment using rule-based approach"""
        text = text.lower()

        # Count positive and negative indicators
        positive_count = sum(1 for word in self.sentiment_rules['positive'][lang] if word in text)
        negative_count = sum(1 for word in self.sentiment_rules['negative'][lang] if word in text)

        # Determine sentiment
        if positive_count > negative_count:
            return 'positive'
        elif negative_count > positive_count:
            return 'negative'
        else:
            return 'neutral'

    def analyze_feedback(self, feedback: str) -> Dict:
        """Main function to analyze feedback"""
        # Detect language
        lang = self.detect_language(feedback)

        # Identify aspects
        aspects = self.identify_aspects(feedback, lang)

        # Analyze sentiment
        sentiment = self.analyze_sentiment(feedback, lang)

        return {
            'language': 'Tagalog' if lang == 'tl' else 'English',
            'aspects': aspects,
            'sentiment': sentiment,
            'text': feedback
        }

    def batch_analyze(self, feedbacks: List[str]) -> List[Dict]:
        """Analyze multiple feedback entries"""
        return [self.analyze_feedback(feedback) for feedback in feedbacks]

# Example usage function
def example_usage():
    analyzer = VetFeedbackAnalyzer()

    # Test cases in both English and Tagalog
    test_feedbacks = [
       "The clinic was very clean and the staff was friendly",
        "Ang tagal naming naghintay sa clinic pero magaling naman ang doctor",
        "Not satisfied with the expensive treatment cost",
        "Hindi masyadong malinis ang lugar pero mabait ang vet",
        "The waiting time was too long but the service was okay",
        "Magaling ang doctor pero medyo mahal ang presyo"
    ]

    results = analyzer.batch_analyze(test_feedbacks)

    for result in results:
        print("\nFeedback:", result['text'])
        print("Language:", result['language'])
        print("Aspects:", ", ".join(result['aspects']))
        print("Sentiment:", result['sentiment'])

if __name__ == "__main__":
    example_usage()
