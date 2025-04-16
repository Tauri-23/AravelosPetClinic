

import sys
sys.argv = ['']
from torch.optim import AdamW
import pandas as pd
import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertForSequenceClassification
from transformers import get_linear_schedule_with_warmup
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_recall_fscore_support, matthews_corrcoef
import matplotlib.pyplot as plt
import seaborn as sns
from tqdm import tqdm
import re
import time
from torch.cuda.amp import autocast, GradScaler


# Define constants - OPTIMIZED FOR SPEED
MAX_LEN = 64  # Reduced from 128 to speed up training
BATCH_SIZE = 32  # Increased from 16
EPOCHS = 50
LEARNING_RATE = 2e-5
MODEL_NAME = 'bert-base-multilingual-cased'  # mBERT model
RANDOM_SEED = 42
EARLY_STOPPING_PATIENCE = 3  # Stop training if no improvement after 3 epochs


# Set random seeds for reproducibility
torch.manual_seed(RANDOM_SEED)
np.random.seed(RANDOM_SEED)


# Define aspects and sentiments
ASPECTS = ['pricing', 'veterinary_service','customer_service', 'hygiene', 'waiting_time', 'booking_experience']
SENTIMENTS = ['negative', 'neutral', 'positive']


class VetClinicFeedbackDataset(Dataset):
   def __init__(self, texts, aspects, sentiments, tokenizer, max_len):
       self.texts = texts
       self.aspects = aspects
       self.sentiments = sentiments
       self.tokenizer = tokenizer
       self.max_len = max_len

   def __len__(self):
       return len(self.texts)

   def __getitem__(self, idx):
       text = str(self.texts[idx])
       aspect = self.aspects[idx]
       sentiment = self.sentiments[idx]

       # Add aspect as a prefix to guide the model
       input_text = f"Aspect: {aspect.replace('_', ' ')}. review: {text}"

       encoding = self.tokenizer.encode_plus(
           input_text,
           add_special_tokens=True,
           max_length=self.max_len,
           return_token_type_ids=True,
           padding='max_length',
           truncation=True,
           return_attention_mask=True,
           return_tensors='pt',
       )

       return {
           'text': text,
           'aspect': aspect,
           'input_ids': encoding['input_ids'].flatten(),
           'attention_mask': encoding['attention_mask'].flatten(),
           'token_type_ids': encoding['token_type_ids'].flatten(),
           'sentiment': torch.tensor(SENTIMENTS.index(sentiment), dtype=torch.long)
       }


def load_feedback_from_excel(file_path):
   """
   Load feedback data from Excel file with 'review' and 'sentiment' columns
   """
   try:
       # Read the Excel file
       df = pd.read_csv(file_path)

       # Check if required columns exist
       required_columns = ['review', 'sentiment']
       for col in required_columns:
           if col not in df.columns:
               raise ValueError(f"Column '{col}' not found in the Excel file")

       # Clean and validate data
       df['review'] = df['review'].astype(str).apply(lambda x: x.strip())

       # Normalize sentiment values (lowercase and strip)
       df['sentiment'] = df['sentiment'].astype(str).str.lower().str.strip()

       # Map sentiment values to standard format if needed
       sentiment_mapping = {
           'negative': 'negative',
           'neg': 'negative',
           'bad': 'negative',
           'neutral': 'neutral',
           'neu': 'neutral',
           'average': 'neutral',
           'positive': 'positive',
           'pos': 'positive',
           'good': 'positive'
       }

       df['sentiment'] = df['sentiment'].map(lambda x: sentiment_mapping.get(x, x))

       # Filter out rows with invalid sentiments
       valid_sentiments = list(sentiment_mapping.values())
       valid_df = df[df['sentiment'].isin(valid_sentiments)]

       if len(valid_df) < len(df):
           print(f"Warning: Filtered out {len(df) - len(valid_df)} rows with invalid sentiment values")

       print(f"Successfully loaded {len(valid_df)} feedbacks from Excel file")
       return valid_df

   except Exception as e:
       print(f"Error loading Excel file: {str(e)}")
       return None


def extract_aspect_keywords():
   """
   Define keywords related to each aspect for automatic labeling
   """
   return {
       'customer_service':['customer service','friendly', 'helpful', 'polite', 'respectful', 'courteous', 'supportive', 'professional', 'kind', 'attentive', 'efficient',
            'patient', 'understanding', 'knowledgeable', 'accommodating', 'considerate', 'responsive', 'welcoming', 'communicative', 'approachable', 'engaging',
            'reliable', 'service', 'assistive', 'service-oriented', 'attitude', 'service-focused', 'assisting', 'teamwork', 'dedicated', 'genuine',
            'kind-hearted', 'friendly-staff', 'service-minded', 'approachability', 'client-focused', 'effortless', 'helpfulness', 'quick-response', 'support',
            'supportive', 'courtesy', 'caring', 'compassionate', 'attentive-staff', 'care-oriented', 'good-service', 'helping', 'considerate', 'trustworthy',
            'reliable-staff', 'dependable', 'warm', 'engaged', 'knowledgeable-staff', 'professionalism', 'skillful', 'efficient-service', 'cooperative', 'engaging',
            'help', 'assistance', 'assistance-available', 'efficiency', 'cooperative-staff', 'quick-help', 'easy-to-work-with', 'courteous-service', 'patient-service',
            'problem-solving', 'courtesy', 'feedback', 'helpful-staff', 'proactive', 'interpersonal', 'timely-service', 'polite-staff',
            'social', 'compassionate', 'approachable-staff', 'teamwork', 'comprehensive', 'politeness', 'welcoming-service', 'quick-response', 'support-staff',
            'skills', 'pleasant', 'fast-response', 'problem-solving-staff', 'client-friendly', 'enthusiastic', 'genuine', 'grateful', 'receptive',
            'clear-communication', 'respect', 'accommodation', 'communicative', 'understanding-staff', 'courteous-attitude', 'considerate-staff', 'clear',
            'reliable-service', 'willingness', 'dedication', 'professional-service', 'respectful-service', 'patient-support', 'easy-service', 'genuine-service',
            'maasikaso', 'magalang', 'magiliw', 'mabait', 'matulungin', 'mahinahon', 'mabilis', 'maaasahan', 'responsable', 'matalino',
            'mahusay', 'maalalahanin', 'kaaya-aya', 'mabuting serbisyo', 'responsibong', 'mapagkalinga', 'magandang serbisyo', 'tapat', 'maalaga', 'mabuting pakikitungo',
            'maasahang', 'magalang na pakikitungo', 'mabilis na serbisyo', 'pagtulong', 'matyaga', 'paghahanda', 'serbisyo', 'proaktibo', 'pagtanggap',
            'handang magbigay ng serbisyo', 'tulungin', 'serbisyong magaan', 'matalinong', 'pagtulong sa pangangailangan', 'malasakit', 'kumportable', 'madali',
            'serbisyong may malasakit', 'serbisyo ng mga kawani', 'mga magiliw na kawani', 'magaan sa loob', 'serbisyong tumutugon', 'masaya', 'responsibong kawani',
            'matulunging kawani', 'bukas sa suhestyon', 'magaan ang pakiramdam', 'may malasakit', 'pagtulong sa pangangailangan', 'serbisyo ng mga staff', 'serbisyo na maaasahan',
            'serbisyo na magaan', 'mahusay na serbisyo', 'malasakit na serbisyo', 'magandang trato', 'magiliw na serbisyo', 'serbisyong maaasahan', 'tumatanggap',
            'serbisyo ng mga tao', 'pagtulong sa lahat ng oras', 'bukas sa mga tanong', 'pagtanggap ng suggestion', 'mabilis sa trabaho', 'mahusay sa pag-aalaga', 'serbisyo na magiliw',
            'serbisyo na maaasahan', 'madaling makausap', 'serbisyo ng staff', 'serbisyong mabilis', 'mabilis na tugon', 'serbisyo na magaan', 'serbisyong may malasakit',
            'magandang trato', 'kaaya-ayang staff', 'pagkalinga', 'mabilis na action', 'magandang pakikisalamuha', 'serbisyong may malasakit', 'serbisyong maagap',
            'serbisyong may malasakit', 'serbisyo ng mga kawani', 'serbisyo na may malasakit', 'pag-aalaga', 'serbisyo na magaan', 'serbisyo na kaaya-aya', 'serbisyong tapat',
            'pagkalinga', 'serbisyong may malasakit', 'serbisyong mabilis', 'serbisyong may malasakit', 'magandang serbisyo', 'serbisyong magaan', 'serbisyong kaaya-aya',
            'serbisyong mabilis', 'malasakit na serbisyo', 'serbisyo ng kawani', 'serbisyong may malasakit'],
       'pricing': ['cost', 'price', 'expensive', 'cheap', 'affordable', 'discount', 'value', 'rate', 'budget', 'expense',
            'overpriced', 'underpriced', 'premium', 'value-for-money', 'affordability', 'fair', 'high', 'low', 'mark-up',
            'deal', 'charge', 'expensiveness', 'inexpensive', 'high-priced', 'pay', 'payment', 'bargain', 'sale', 'fee',
            'costly', 'cheapness', 'payable', 'pricey', 'affordable', 'economical', 'expensive', 'pocket-friendly',
            'markup', 'extra', 'discounted', 'clearance', 'voucher', 'receipt', 'transaction', 'offer', 'value-added',
            'quote', 'payment', 'spend', 'cost-effectiveness', 'fair-priced', 'premium', 'costing', 'package', 'afford',
            'cheap', 'rate', 'competitive', 'pricing-plan', 'balance', 'chargeable', 'market-value', 'surge', 'overpay',
            'pricing-model', 'payment-method', 'monthly', 'yearly', 'one-time', 'financial', 'negotiation', 'custom-price',
            'cost-effectiveness', 'economical', 'paycheck', 'finances', 'pricing-policy', 'discount-rate', 'fixed-price', 'annual',
            'offerings', 'rates', 'installments', 'transaction-cost', 'tax', 'tip', 'subsidized', 'cost-efficiency', 'non-refundable',
            'special-offer', 'promo', 'affordable-price', 'refund', 'paid', 'quote', 'payment-terms','halaga', 'presyo', 'mura', 'mahal', 'abordable', 'diskwento', 'halaga', 'bayad', 'halaga', 'presyohan',
            'mahal-mahal', 'mababang-halaga', 'makatarungan', 'pagpepresyo', 'taas', 'baba', 'gastos', 'kabuuang halaga',
            'kamahalan', 'bargain', 'mura', 'pagbabayad', 'presyo', 'pangbili', 'budget', 'pakete', 'discounted',
            'bayaran', 'tanggihan', 'mabigat', 'badyet', 'presyohan', 'mas mura', 'discount', 'matipid', 'presyo',
            'kulang', 'bayaran', 'pagtanggap', 'pag-aalok', 'pagkakasunduan', 'labis', 'abode', 'mabilis', 'magsukli',
            'regular', 'matipid', 'mababang presyo', 'halaga', 'halaga ng serbisyo', 'buwis', 'buo', 'tanggapin', 'presyo ng mga gamit',
            'takdang halaga', 'mabibigat', 'pababa', 'matipid', 'suportahan', 'pagtanggap', 'dahil sa diskwento', 'pay-out',
            'pagkakita', 'rate', 'bayaran', 'pagtanggap ng halaga', 'order', 'value', 'mura', 'kung ano ang halaga', 'promo',
            'komisyon', 'mga singil','ginugol', 'pagpapasya', 'presyo ng serbisyo', 'pagtanggap', 'presyo ng pagbili', 'single-price', 'payment', 'presyo ng produkto',
            'bonus', 'mga gabay', 'mga pondo', 'pasabog', 'abayad', 'mababa', 'tulungan', 'mababang gastos', 'bayaran'],
       'veterinary_service': ['veterinary service','care', 'treatment', 'health', 'veterinarian', 'doctor', 'vet', 'nurse', 'recovery', 'recovery', 'diagnosis',
            'symptoms', 'medicine', 'procedure', 'check-up', 'vaccination', 'surgery', 'wound', 'injury', 'wellness', 'therapy',
            'treatment', 'medication', 'vaccines', 'neutering', 'spay', 'castration', 'healthcare', 'spay', 'neuter', 'exam',
            'health-check', 'condition', 'pet', 'service', 'well-being', 'post-surgery', 'aftercare', 'caregiver', 'treatment-plan',
            'veterinary', 'consultation', 'assist', 'professional', 'pets', 'recovery', 'comfort', 'wellbeing', 'care-plan',
            'healing', 'support', 'veterinary-care', 'pet-treatment', 'caregivers', 'clinic', 'cleaning', 'medications', 'health-record',
            'physical-exam', 'emergency-care', 'disease', 'diagnostics', 'pet-safety', 'grooming', 'supportive', 'supervision', 'veterinary-services',
            'services', 'vet-care', 'pet-doctor', 'treatment-plan', 'post-op', 'medical-exam', 'veterinarian', 'patient', 'assistance',
            'quality', 'vet-services', 'clinical-care', 'healing', 'medicine', 'care-guide', 'test', 'prescription', 'infection',
            'injuries', 'prevention', 'recovery-plan', 'urgent-care', 'medicines', 'shots', 'advice', 'monitoring', 'pet-wellness',
            'medical-attention', 'treatments', 'illness', 'injections', 'specialist', 'healing-process', 'regular-care', 'protection',
            'parasite', 'preventative', 'vaccine', 'meds', 'recovery-time', 'care-experience', 'health-monitoring', 'preventative-care',
            'wellbeing-check', 'pet-therapy', 'grooming', 'treatment-sessions','pag-aalaga', 'kalusugan', 'doktor', 'vet', 'gamutin', 'pagpapagaling', 'gamot', 'pagsusuri', 'kalusugan', 'serbisyo',
            'gamot', 'pagsusuri', 'pagpapagamot', 'pagkonsulta', 'paggamot', 'pagsusuri', 'nurse', 'doctor', 'wound', 'grooming',
            'pagpapabuti', 'kapakanan', 'veterinaryo','beterinaryo', 'pagsusuri', 'kalusugan', 'serbisyong medikal', 'diabetes', 'check-up', 'serbisyo ng hayop',
            'pagpaplano', 'servisyo', 'medikal', 'pagsusuri', 'mga gamot', 'gamot ng hayop', 'pagtulong', 'tulong', 'gamit', 'serbisyo ng alaga',
            'preskripsyon', 'kalusugan ng hayop', 'paggagamot', 'tulong-pangkalusugan', 'mga operasyon', 'pag-aalaga', 'mga pagsusuri', 'test',
            'medikal', 'gamot ng hayop', 'gamot na inumin', 'kalusugan ng aso', 'pagpapasuso', 'pagtanggap', 'alalay', 'clinic', 'kapakanan',
            'aftercare', 'pagtulong', 'serbisyong medikal', 'mga medikal', 'serbisyong gamutin', 'gabi ng pangangalaga', 'konsulta', 'alalay',
            'galing', 'serbisyong medikal', 'alagang hayop', 'ginagamot', 'tulungan', 'kondisyon', 'antibiotiko', 'injection', 'pribadong konsultasyon',
            'pagkonsulta', 'vet', 'karamdaman', 'ginagamot', 'pag-aalaga', 'kapakanan', 'pagtulong', 'may-bisa', 'pagkilos', 'medikal',
            'pagkonsulta', 'pagpapabuti', 'pag-aalaga ng hayop', 'serbisyo sa hayop', 'gamit pangkalusugan', 'pagkalinga', 'makatarungan', 'ginagamot',
            'gamot sa hayop', 'paggamot sa hayop', 'pagpapayo', 'patnubay', 'healing', 'serbisyong pangkalusugan', 'kapakanan', 'pagpapagaling',
            'prevention', 'kalusugan ng alaga', 'hayop', 'tulong medikal', 'pagsubok'],
       'hygiene': ['clean', 'hygiene', 'sanitize', 'sanitary', 'sterile', 'tidy', 'disinfect', 'neat', 'spotless', 'fresh',
            'odorless', 'organized', 'clutter', 'trash', 'garbage', 'filthy', 'dirt', 'dust', 'mop', 'sweep',
            'cleaner', 'soap', 'bleach', 'germs', 'bacteria', 'virus', 'messy', 'unsanitary', 'smelly', 'deodorize',
            'wipe', 'scrub', 'dirty', 'infection', 'waste', 'feces', 'urine', 'poop', 'sanitize', 'tidiness',
            'maintenance', 'floor', 'walls', 'restroom', 'toilet', 'sink', 'bathroom', 'bin', 'pest', 'cleanliness',
            'stains', 'smudge', 'mold', 'bugs', 'insects', 'scent', 'freshener', 'gloves', 'cleaning', 'filth',
            'disinfectant', 'sterilizer', 'detergent', 'soiled', 'odor', 'stink', 'unhygienic', 'shine', 'bleached', 'grooming',
            'drain', 'muck', 'unclean', 'rags', 'squalid', 'dusty', 'wiped', 'wastebin', 'spray', 'cleanliness',
            'spotty', 'untidy', 'grime', 'sanitize', 'sterility', 'cleanse', 'unsightly', 'droppings', 'dirtiness', 'messes',
            'damp', 'wipe-down', 'deodorant', 'decontaminate', 'litter', 'pungent', 'wash', 'scruffy', 'mess', 'tidied','malinis', 'kalinisan', 'linis', 'marumi', 'kalat', 'alikabok', 'basura', 'amoy', 'masangsang', 'bahò',
            'kakalat', 'punas', 'walis', 'maputik', 'basahan', 'sanitizer', 'hugas', 'pintura', 'lababo', 'kubeta',
            'banyo', 'palikuran', 'bakterya', 'mikrobyo', 'insekto', 'ipis', 'dumi', 'tae', 'ihi', 'kuto',
            'sabón', 'panlinis', 'pamunas', 'gamit', 'latak', 'ulô', 'mantsa', 'hulma', 'gamot', 'kemikal',
            'bulok', 'sirâ', 'kalawang', 'gamot', 'linisin', 'pamunas', 'pampabango', 'kalatán', 'langis', 'putik',
            'baho', 'amoy', 'alikabok', 'gusot', 'punit', 'punasan', 'kuskos', 'mop', 'mapanghi', 'malansa',
            'halaman', 'tubig', 'makalat', 'mabaho', 'mahugaw', 'alinsangan', 'makintab', 'hininga', 'kusina', 'paligid',
            'kutsara', 'plato', 'mantsahan', 'maputi', 'madungis', 'madulas', 'hugasan', 'padulas', 'pamunas', 'buga',
            'spray', 'tulo', 'tubig', 'tuyo', 'maayos', 'maaliwalas', 'malamig', 'kumot', 'basahan', 'lamesa',
            'kutsilyo', 'tissue', 'kutsara', 'pintuan', 'kisame', 'dingding', 'bintana', 'hagdan', 'salamin', 'lamok'],
       'waiting_time': ['waiting', 'delay', 'wait', 'line', 'queue', 'waiting-room', 'waiting-area', 'wait-time', 'waitlist', 'time',
            'service-time', 'wait', 'timeframe', 'slow', 'speed', 'patience', 'fast', 'efficiency', 'timing', 'hold',
            'waiting-period', 'long', 'short', 'quick', 'delayed', 'appointment', 'schedule', 'appointment-time', 'service',
            'waiting', 'hours', 'minutes', 'wait-time', 'quickness', 'lateness', 'delay-time', 'service-speed', 'rush',
            'timeliness', 'wait-time', 'waiting-experience', 'on-time', 'wait-period', 'time-waiting', 'waiting-hours',
            'queue-time', 'queue', 'delayed', 'short-wait', 'long-wait', 'waiting-line', 'time', 'duration', 'patient',
            'service-wait', 'time-service', 'on-time-service', 'delays', 'waiting-room-time', 'long-wait', 'wait-time-feel', 'waiting-period',
            'hold-time', 'waiting-period', 'minutes-wait', 'long-wait', 'appointment-wait', 'delayed-service', 'waiting-interval', 'timing-delay',
            'waiting-service', 'service-delays', 'waiting-periods', 'quick-response', 'schedule-wait', 'wait-before', 'wait-feeling',
            'waiting-wait', 'period-of-wait', 'wait-duration', 'waiting', 'fast-service', 'time-waited', 'waiting-limits', 'time-at-wait',
            'waiting-interval', 'appointment-delay', 'time-on-wait', 'time-in-line', 'wait-time-period', 'wait-time-feeling', 'speedy-service',
            'waiting-experience', 'wait-in-line', 'waiting-speed', 'waiting-appointment', 'waiting-feel', 'fast-wait', 'wait-test',
            'waiting-expected', 'waiting-issues','pag-hintay', 'oras', 'pag-antay', 'linya', 'queue', 'oras ng paghihintay', 'sukatan', 'takdang oras', 'hantungan', 'oras ng serbisyo',
            'panaho', 'oras ng serbisyo', 'matagal', 'mabilis', 'paghihintay', 'pagsusuri', 'pag-hintay', 'pag-aantay', 'oras ng pagtanggap',
            'pagpipilian', 'antay', 'paghihintay sa linya', 'pag-aantay', 'mabilis', 'antay na oras', 'paghihintay na kwento', 'mabilis na serbisyo',
            'pag-hantay', 'pagsusuri', 'hantungan', 'pagtatapos', 'pag-antay', 'antay ng serbisyo', 'tagal ng pag-antay', 'oras ng paghihintay',
            'pag-hihintay', 'matagal na serbisyo', 'pag-antay', 'patience', 'kaantayan', 'serbisyo', 'oras ng linya', 'paghihintay sa saksi',
            'paglong-hintay', 'mabilis', 'serbisyo', 'pagtanggap ng oras', 'matagal', 'antay', 'pag-tukoy ng oras', 'pag-aantay', 'oras ng paghihintay',
            'pagsusuri', 'huwag maghintay', 'pag-antay', 'mabilis', 'pagpili', 'sa oras', 'ang oras', 'pagtaas', 'mabilis na pag-hintay',
            'pag-hantay', 'oras ng serbisyo', 'pag-hintay sa serbisyo', 'pang-antay', 'long-wait', 'pagsunod', 'pagsusuri', 'antay na resulta',
            'pag-aantay', 'tahimik', 'kasama', 'pag-hantay', 'mabilis', 'ating oras', 'pagtatapos', 'sana matapos', 'oras ng linya',
            'pang-hintay', 'mabilis ang serbisyo', 'hantungan', 'pag-antay na serbisyo', 'maghintay', 'matagal na linya', 'matagal na wait', 'taas ng linya'],
       'booking_experience': ['book', 'schedule', 'appointment', 'call', 'phone', 'online', 'website', 'reserve', 'confirmation', 'reschedule', 'cancel','pag-book','tawag','tumawag','iskedyul', 'simple','process','proseso','email','website','approve','apruba']
   }


def analyze_feedback_content(feedback_text):
   """
   Analyze feedback content to determine which aspects are mentioned
   """
   aspect_keywords = extract_aspect_keywords()
   mentioned_aspects = {}

   # Convert to lowercase for case-insensitive matching
   feedback_lower = feedback_text.lower()

   for aspect, keywords in aspect_keywords.items():
       # Check if any keyword for this aspect is in the feedback
       mentions = [keyword for keyword in keywords if re.search(r'\b' + re.escape(keyword) + r'\b', feedback_lower)]

       if mentions:
           # Aspect is mentioned in the feedback
           mentioned_aspects[aspect] = mentions

   # If no aspects detected, include all aspects for analysis
   if not mentioned_aspects:
       return {"overall": []}

   return mentioned_aspects


def prepare_training_data(feedback_df):
   """
   Prepare training data from feedback DataFrame with automatic aspect detection
   """
   texts, aspects, sentiments = [], [], []

   for _, row in feedback_df.iterrows():
       feedback_text = row['review']
       overall_sentiment = row['sentiment']

       # Analyze which aspects are mentioned in the feedback
       mentioned_aspects = analyze_feedback_content(feedback_text)

       # For each mentioned aspect, create a training example
       for aspect, _ in mentioned_aspects.items():
           texts.append(feedback_text)
           aspects.append(aspect)
           sentiments.append(overall_sentiment)

   return texts, aspects, sentiments


def calculate_metrics(true_labels, predictions):
    """
    Calculate and return comprehensive metrics
    """
    # Calculate accuracy
    accuracy = accuracy_score(true_labels, predictions)

    # Calculate precision, recall, and f1 score for each class
    precision, recall, f1, _ = precision_recall_fscore_support(true_labels, predictions, average='weighted')

    # Calculate Matthews Correlation Coefficient
    mcc = matthews_corrcoef(true_labels, predictions)

    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1,
        'mcc': mcc
    }


def evaluate_model(model, data_loader, device):
    """
    Evaluate the model and return predictions, true labels, and metrics
    """
    model.eval()
    predictions, true_labels = [], []
    aspect_labels = []
    eval_loss = 0

    with torch.no_grad():
        for batch in data_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            token_type_ids = batch['token_type_ids'].to(device)
            sentiments = batch['sentiment'].to(device)

            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                token_type_ids=token_type_ids,
                labels=sentiments
            )

            loss = outputs.loss
            eval_loss += loss.item()

            logits = outputs.logits
            _, preds = torch.max(logits, dim=1)

            predictions.extend(preds.cpu().tolist())
            true_labels.extend(sentiments.cpu().tolist())
            aspect_labels.extend(batch['aspect'])

    avg_loss = eval_loss / len(data_loader)
    metrics = calculate_metrics(true_labels, predictions)

    return predictions, true_labels, aspect_labels, avg_loss, metrics


def train_model_from_excel(excel_file_path):
   """
   Train the model using data from Excel with improved speed and metrics tracking
   """
   # 1. Load feedback data from Excel
   print(f"Loading feedback data from Excel file: {excel_file_path}")
   start_time = time.time()
   feedback_df = load_feedback_from_excel(excel_file_path)

   if feedback_df is None or len(feedback_df) == 0:
       print("No valid feedback data found. Training aborted.")
       return None, None

   # 2. Prepare training data with automatic aspect detection
   print("Analyzing feedback content and preparing training data...")
   texts, aspects, sentiments = prepare_training_data(feedback_df)

   print(f"Prepared {len(texts)} training examples across {len(set(aspects))} aspects")

   # 3. Split data into train and validation sets
   train_texts, val_texts, train_aspects, val_aspects, train_sentiments, val_sentiments = train_test_split(
       texts, aspects, sentiments, test_size=0.2, random_state=RANDOM_SEED, stratify=sentiments
   )

   # 4. Initialize tokenizer and create datasets
   tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)

   train_dataset = VetClinicFeedbackDataset(
       texts=train_texts,
       aspects=train_aspects,
       sentiments=train_sentiments,
       tokenizer=tokenizer,
       max_len=MAX_LEN
   )

   val_dataset = VetClinicFeedbackDataset(
       texts=val_texts,
       aspects=val_aspects,
       sentiments=val_sentiments,
       tokenizer=tokenizer,
       max_len=MAX_LEN
   )

   # 5. Create data loaders
   train_loader = DataLoader(
       train_dataset,
       batch_size=BATCH_SIZE,
       shuffle=True,
       num_workers=4  # Speed up data loading with multiple workers
   )

   val_loader = DataLoader(
       val_dataset,
       batch_size=BATCH_SIZE,
       num_workers=4
   )

   # 6. Initialize model
   print(f"Initializing {MODEL_NAME} model...")
   model = BertForSequenceClassification.from_pretrained(
       MODEL_NAME,
       num_labels=len(SENTIMENTS),
       output_attentions=False,
       output_hidden_states=False
   )

   # 7. Setup training parameters
   optimizer = AdamW(model.parameters(), lr=LEARNING_RATE)
   total_steps = len(train_loader) * EPOCHS
   scheduler = get_linear_schedule_with_warmup(
       optimizer,
       num_warmup_steps=0,
       num_training_steps=total_steps
   )

   device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
   model = model.to(device)

   # Initialize gradient scaler for mixed precision training
   scaler = GradScaler()

   # 8. Training loop with early stopping
   print("Starting training...")
   print("Device:", device)

   best_val_loss = float('inf')
   patience_counter = 0
   training_stats = []

   for epoch in range(EPOCHS):
       epoch_start_time = time.time()
       print(f"\nEpoch {epoch + 1}/{EPOCHS}")

       # Training phase
       model.train()
       train_loss = 0

       for batch in tqdm(train_loader, desc="Training"):
           input_ids = batch['input_ids'].to(device)
           attention_mask = batch['attention_mask'].to(device)
           token_type_ids = batch['token_type_ids'].to(device)
           sentiments = batch['sentiment'].to(device)

           model.zero_grad()

           # Use mixed precision training if on CUDA
           if device.type == 'cuda':
               with autocast():
                   outputs = model(
                       input_ids=input_ids,
                       attention_mask=attention_mask,
                       token_type_ids=token_type_ids,
                       labels=sentiments
                   )
                   loss = outputs.loss

               # Scale gradients and optimize
               scaler.scale(loss).backward()
               scaler.unscale_(optimizer)
               torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
               scaler.step(optimizer)
               scaler.update()
           else:
               # Regular training if not on CUDA
               outputs = model(
                   input_ids=input_ids,
                   attention_mask=attention_mask,
                   token_type_ids=token_type_ids,
                   labels=sentiments
               )
               loss = outputs.loss
               loss.backward()
               torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
               optimizer.step()

           scheduler.step()
           train_loss += loss.item()

       avg_train_loss = train_loss / len(train_loader)

       # Validation phase
       predictions, true_labels, aspect_labels, avg_val_loss, val_metrics = evaluate_model(model, val_loader, device)

       # Calculate metrics for each aspect
       aspect_performance = {}
       for aspect in ASPECTS:
           aspect_indices = [i for i, a in enumerate(aspect_labels) if a == aspect]
           if aspect_indices:
               aspect_true = [true_labels[i] for i in aspect_indices]
               aspect_pred = [predictions[i] for i in aspect_indices]
               aspect_metrics = calculate_metrics(aspect_true, aspect_pred)
               aspect_performance[aspect] = aspect_metrics

       # Print epoch metrics
       epoch_time = time.time() - epoch_start_time
       print(f"Epoch {epoch + 1} completed in {epoch_time:.2f} seconds")
       print(f"Training loss: {avg_train_loss:.4f}, Validation loss: {avg_val_loss:.4f}")
       print(f"Overall metrics:")
       print(f"  Accuracy: {val_metrics['accuracy']:.4f}")
       print(f"  Precision: {val_metrics['precision']:.4f}")
       print(f"  Recall: {val_metrics['recall']:.4f}")
       print(f"  F1 Score: {val_metrics['f1']:.4f}")
       print(f"  Matthews Correlation: {val_metrics['mcc']:.4f}")

       print("\nPerformance by aspect:")
       for aspect, metrics in aspect_performance.items():
           print(f"  {aspect}:")
           print(f"    Accuracy: {metrics['accuracy']:.4f}")
           print(f"    F1 Score: {metrics['f1']:.4f}")

       # Print classification report
       print("\nClassification Report:")
       print(classification_report(true_labels, predictions, target_names=SENTIMENTS))

       # Track stats
       training_stats.append({
           'epoch': epoch + 1,
           'train_loss': avg_train_loss,
           'val_loss': avg_val_loss,
           'val_accuracy': val_metrics['accuracy'],
           'val_precision': val_metrics['precision'],
           'val_recall': val_metrics['recall'],
           'val_f1': val_metrics['f1'],
           'val_mcc': val_metrics['mcc'],
           'epoch_time': epoch_time
       })

       # Early stopping check
       if avg_val_loss < best_val_loss:
           best_val_loss = avg_val_loss
           patience_counter = 0

           # Save the best model
           print("New best model found! Saving...")
           model_save_path = f"checkpoints/model_epoch_{epoch+1}"
           tokenizer_save_path = f"checkpoints/tokenizer_epoch_{epoch+1}"
           model.save_pretrained(model_save_path)
           tokenizer.save_pretrained(tokenizer_save_path)
       else:
           patience_counter += 1
           print(f"No improvement in validation loss. Patience: {patience_counter}/{EARLY_STOPPING_PATIENCE}")

       if patience_counter >= EARLY_STOPPING_PATIENCE:
           print(f"Early stopping triggered after {epoch + 1} epochs")
           break

   # 9. Training summary
   total_training_time = time.time() - start_time
   print(f"\nTraining completed in {total_training_time:.2f} seconds")

   # Create training history plots
   plt.figure(figsize=(12, 4))
   plt.subplot(1, 2, 1)
   plt.plot([stat['train_loss'] for stat in training_stats], label='Training Loss')
   plt.plot([stat['val_loss'] for stat in training_stats], label='Validation Loss')
   plt.xlabel('Epoch')
   plt.ylabel('Loss')
   plt.legend()
   plt.title('Training and Validation Loss')

   plt.subplot(1, 2, 2)
   plt.plot([stat['val_accuracy'] for stat in training_stats], label='Accuracy')
   plt.plot([stat['val_f1'] for stat in training_stats], label='F1 Score')
   plt.plot([stat['val_mcc'] for stat in training_stats], label='MCC')
   plt.xlabel('Epoch')
   plt.ylabel('Score')
   plt.legend()
   plt.title('Validation Metrics')

   plt.tight_layout()
   plt.savefig('training_history.png')
   print("Training history plot saved to 'training_history.png'")

   # 10. Save aspect keywords for future use
   aspect_keywords = extract_aspect_keywords()
   with open("aspect_keywords.txt", 'w') as f:
       for aspect, keywords in aspect_keywords.items():
           f.write(f"{aspect}: {', '.join(keywords)}\n")

   # Load the best model
   best_model = BertForSequenceClassification.from_pretrained("vet_clinic_feedback_model")
   best_model = best_model.to(device)

   return best_model, tokenizer


def analyze_feedback(model, tokenizer, feedback_text):
   """
   Analyze new feedback across all aspects
   """
   device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
   model = model.to(device)
   model.eval()

   results = {}

   # First, detect which aspects are mentioned in the feedback
   mentioned_aspects = analyze_feedback_content(feedback_text)

   # Analyze all five standard aspects
   for aspect in ASPECTS:
       print(f"Processing feedback: {repr(feedback_text)}")
       print(f"Type of feedback_text: {type(feedback_text)}")       
       if feedback_text is None or not isinstance(feedback_text, str):
            feedback_text = ""  # or handle accordingly
       input_text = f"Aspect: {aspect.replace('_', ' ')}. Feedback: {feedback_text}"

       encoding = tokenizer.encode_plus(
           input_text,
           add_special_tokens=True,
           max_length=MAX_LEN,
           return_token_type_ids=True,
           padding='max_length',
           truncation=True,
           return_attention_mask=True,
           return_tensors='pt',
       )

       input_ids = encoding['input_ids'].to(device)
       attention_mask = encoding['attention_mask'].to(device)
       token_type_ids = encoding['token_type_ids'].to(device)

       with torch.no_grad():
           outputs = model(
               input_ids=input_ids,
               attention_mask=attention_mask,
               token_type_ids=token_type_ids
           )

           logits = outputs.logits
           probabilities = torch.nn.functional.softmax(logits, dim=1)
           sentiment_idx = torch.argmax(probabilities, dim=1).item()
           confidence = probabilities[0][sentiment_idx].item()

           results[aspect] = {
               'sentiment': SENTIMENTS[sentiment_idx],
               'confidence': confidence,
               'probabilities': {SENTIMENTS[i]: prob.item() for i, prob in enumerate(probabilities[0])},
               'mentioned': aspect in mentioned_aspects,
               'keywords': mentioned_aspects.get(aspect, [])
           }

   return results


def analyze_excel_feedbacks(model, tokenizer, excel_file_path):
   """
   Analyze all feedbacks in an Excel file
   """
   # Load the Excel file
   feedback_df = load_feedback_from_excel(excel_file_path)

   if feedback_df is None or len(feedback_df) == 0:
       return None

   # Analyze each feedback
   results = []

   print(f"Analyzing {len(feedback_df)} feedbacks...")
   for _, row in tqdm(feedback_df.iterrows(), total=len(feedback_df)):
       feedback_text = row['review']
       original_sentiment = row['sentiment']

       # Analyze the feedback for all aspects
       analysis_results = analyze_feedback(model, tokenizer, feedback_text)

       # Add the original overall sentiment for comparison
       results.append({
           'feedback': feedback_text,
           'original_sentiment': original_sentiment,
           'analysis': analysis_results
       })

   return results


def visualize_aspect_sentiments(analysis_results):
   """
   Visualize sentiment distribution across aspects
   """
   # Count sentiment occurrences for each aspect
   aspect_sentiments = {aspect: {'negative': 0, 'neutral': 0, 'positive': 0} for aspect in ASPECTS}

   # Only count aspects that were actually mentioned
   mentioned_counts = {aspect: 0 for aspect in ASPECTS}

   for result in analysis_results:
       for aspect, analysis in result['analysis'].items():
           if analysis['mentioned']:
               aspect_sentiments[aspect][analysis['sentiment']] += 1
               mentioned_counts[aspect] += 1

   # Create a DataFrame for plotting
   data = []
   for aspect in ASPECTS:
       for sentiment in SENTIMENTS:
           count = aspect_sentiments[aspect][sentiment]
           percentage = (count / mentioned_counts[aspect] * 100) if mentioned_counts[aspect] > 0 else 0
           data.append({
               'Aspect': aspect.replace('_', ' ').title(),
               'Sentiment': sentiment.title(),
               'Count': count,
               'Percentage': percentage
           })

   df = pd.DataFrame(data)

   # Create a stacked bar chart
   plt.figure(figsize=(12, 8))

   # Define colors for sentiments
   colors = {'Positive': 'green', 'Neutral': 'gray', 'Negative': 'red'}

   # Create the plot
   sentiment_pivot = df.pivot(index='Aspect', columns='Sentiment', values='Percentage')
   sentiment_pivot = sentiment_pivot.reindex(columns=['Positive', 'Neutral', 'Negative'])

   ax = sentiment_pivot.plot(kind='bar', stacked=True, color=[colors[c] for c in sentiment_pivot.columns], figsize=(12, 8))

   # Add labels and title
   plt.title('Sentiment Distribution Across Aspects', fontsize=16)
   plt.xlabel('Aspect', fontsize=14)
   plt.ylabel('Percentage', fontsize=14)
   plt.xticks(rotation=45)

   # Add counts as annotations
   for aspect_idx, aspect in enumerate(sentiment_pivot.index):
       total = mentioned_counts[aspect.lower().replace(' ', '_')]
       plt.text(aspect_idx, 105, f'n={total}', ha='center', fontsize=12)

   # Add percentages on the bars
   for i, aspect in enumerate(sentiment_pivot.index):
       cumulative = 0
       for sentiment in sentiment_pivot.columns:
           value = sentiment_pivot.loc[aspect, sentiment]
           if value > 5:  # Only show percentage if it's large enough to be visible
               plt.text(i, cumulative + value/2, f'{value:.1f}%', ha='center', va='center', fontsize=10)
           cumulative += value

   plt.ylim(0, 110)  # Leave space for the count annotations
   plt.tight_layout()
   plt.legend(title='Sentiment')

   plt.savefig('aspect_sentiment_distribution.png')
   print("Saved visualization to 'aspect_sentiment_distribution.png'")

   return plt

def visualize_model_performance(test_results, output_file="model_performance.png"):
    """
    Create visualizations showing model performance across aspects and sentiments
    """
    if not test_results or 'aspect_results' not in test_results:
        print("No valid test results to visualize.")
        return
    
    aspect_results = test_results['aspect_results']
    
    # Calculate metrics for visualization
    aspects = []
    overall_accuracy = []
    positive_f1 = []
    neutral_f1 = []
    negative_f1 = []
    
    for aspect in ASPECTS:
        stats = aspect_results[aspect]
        aspects.append(aspect.replace('_', ' ').title())
        
        # Calculate accuracy
        accuracy = stats['correct'] / stats['total'] if stats['total'] > 0 else 0
        overall_accuracy.append(accuracy)
        
        # Calculate F1 scores for each sentiment
        # Positive F1
        pos_recall = stats['positive']['correct'] / stats['positive']['total'] if stats['positive']['total'] > 0 else 0
        pos_precision = stats['positive']['correct'] / stats['positive']['predicted'] if stats['positive']['predicted'] > 0 else 0
        pos_f1 = 2 * pos_recall * pos_precision / (pos_recall + pos_precision) if (pos_recall + pos_precision) > 0 else 0
        positive_f1.append(pos_f1)
        
        # Neutral F1
        neu_recall = stats['neutral']['correct'] / stats['neutral']['total'] if stats['neutral']['total'] > 0 else 0
        neu_precision = stats['neutral']['correct'] / stats['neutral']['predicted'] if stats['neutral']['predicted'] > 0 else 0
        neu_f1 = 2 * neu_recall * neu_precision / (neu_recall + neu_precision) if (neu_recall + neu_precision) > 0 else 0
        neutral_f1.append(neu_f1)
        
        # Negative F1
        neg_recall = stats['negative']['correct'] / stats['negative']['total'] if stats['negative']['total'] > 0 else 0
        neg_precision = stats['negative']['correct'] / stats['negative']['predicted'] if stats['negative']['predicted'] > 0 else 0
        neg_f1 = 2 * neg_recall * neg_precision / (neg_recall + neg_precision) if (neg_recall + neg_precision) > 0 else 0
        negative_f1.append(neg_f1)
    
    # Create the figure with subplots
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 12))
    
    # Plot 1: Overall accuracy by aspect
    x = np.arange(len(aspects))
    width = 0.6
    
    ax1.bar(x, overall_accuracy, width, color='blue', alpha=0.7)
    ax1.set_xlabel('Aspect')
    ax1.set_ylabel('Accuracy')
    ax1.set_title('Overall Model Accuracy by Aspect')
    ax1.set_xticks(x)
    ax1.set_xticklabels(aspects, rotation=45)
    ax1.set_ylim(0, 1.0)
    
    # Add accuracy values on top of bars
    for i, v in enumerate(overall_accuracy):
        ax1.text(i, v + 0.02, f'{v:.2f}', ha='center', va='bottom')
    
    # Plot 2: F1 scores by sentiment and aspect
    width = 0.25
    
    ax2.bar(x - width, positive_f1, width, label='Positive', color='green', alpha=0.7)
    ax2.bar(x, neutral_f1, width, label='Neutral', color='gray', alpha=0.7)
    ax2.bar(x + width, negative_f1, width, label='Negative', color='red', alpha=0.7)
    
    ax2.set_xlabel('Aspect')
    ax2.set_ylabel('F1 Score')
    ax2.set_title('F1 Scores by Aspect and Sentiment')
    ax2.set_xticks(x)
    ax2.set_xticklabels(aspects, rotation=45)
    ax2.set_ylim(0, 1.0)
    ax2.legend()
    
    # Add overall metrics as text
    overall_metrics = test_results['overall_metrics']
    ax2.text(0.5, -0.2, 
             f"Overall Performance: Accuracy={overall_metrics['accuracy']:.4f}, F1={overall_metrics['f1']:.4f}, MCC={overall_metrics['mcc']:.4f}",
             ha='center', va='center', transform=ax2.transAxes)
    
    plt.tight_layout()
    plt.savefig(output_file)
    print(f"Model performance visualization saved to '{output_file}'")
    
    return fig

def test_model_with_dataset(model, tokenizer, excel_file_path):
    """
    Test the model against the dataset and generate a comprehensive report
    showing performance on each aspect and sentiment category
    """
    print(f"Testing model with dataset from: {excel_file_path}")
    
    # Load the feedback data
    feedback_df = load_feedback_from_excel(excel_file_path)
    
    if feedback_df is None or len(feedback_df) == 0:
        print("No valid feedback data found. Testing aborted.")
        return None
    
    # Prepare data with automatic aspect detection
    texts, aspects, sentiments = prepare_training_data(feedback_df)
    
    # Create test dataset
    test_dataset = VetClinicFeedbackDataset(
        texts=texts,
        aspects=aspects,
        sentiments=sentiments,
        tokenizer=tokenizer,
        max_len=MAX_LEN
    )
    
    test_loader = DataLoader(
        test_dataset,
        batch_size=BATCH_SIZE,
        num_workers=2
    )
    
    # Get predictions
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    
    print("Evaluating model...")
    predictions, true_labels, aspect_labels, test_loss, overall_metrics = evaluate_model(model, test_loader, device)
    
    # Convert numeric predictions and labels to sentiment names
    pred_sentiments = [SENTIMENTS[p] for p in predictions]
    true_sentiments = [SENTIMENTS[t] for t in true_labels]
    
    # Group results by aspect
    aspect_results = {aspect: {'correct': 0, 'total': 0, 
                              'positive': {'correct': 0, 'total': 0, 'predicted': 0},
                              'neutral': {'correct': 0, 'total': 0, 'predicted': 0},
                              'negative': {'correct': 0, 'total': 0, 'predicted': 0}} 
                     for aspect in ASPECTS}
    
    # Calculate metrics for each aspect and sentiment
    for idx, (aspect, true_sentiment, pred_sentiment) in enumerate(zip(aspect_labels, true_sentiments, pred_sentiments)):
        # Update counts for this aspect
        aspect_results[aspect]['total'] += 1
        aspect_results[aspect][true_sentiment]['total'] += 1
        aspect_results[aspect][pred_sentiment]['predicted'] += 1
        
        # Check if prediction is correct
        if pred_sentiment == true_sentiment:
            aspect_results[aspect]['correct'] += 1
            aspect_results[aspect][true_sentiment]['correct'] += 1
    
    # Generate detailed report
    print("\n===== MODEL TEST RESULTS =====")
    print(f"Overall Accuracy: {overall_metrics['accuracy']:.4f}")
    print(f"Overall F1 Score: {overall_metrics['f1']:.4f}")
    print(f"Overall MCC: {overall_metrics['mcc']:.4f}")
    
    # Format aspect results as a table
    print("\n===== PERFORMANCE BY ASPECT =====")
    print("Aspect               | Accuracy | Positive          | Neutral           | Negative          ")
    print("---------------------|----------|-------------------|-------------------|-------------------")
    
    for aspect in ASPECTS:
        stats = aspect_results[aspect]
        accuracy = stats['correct'] / stats['total'] if stats['total'] > 0 else 0
        
        # Format positive results
        pos_recall = stats['positive']['correct'] / stats['positive']['total'] if stats['positive']['total'] > 0 else 0
        pos_precision = stats['positive']['correct'] / stats['positive']['predicted'] if stats['positive']['predicted'] > 0 else 0
        pos_f1 = 2 * pos_recall * pos_precision / (pos_recall + pos_precision) if (pos_recall + pos_precision) > 0 else 0
        pos_stats = f"{pos_f1:.2f}F1 ({stats['positive']['correct']}/{stats['positive']['total']})"
        
        # Format neutral results
        neu_recall = stats['neutral']['correct'] / stats['neutral']['total'] if stats['neutral']['total'] > 0 else 0
        neu_precision = stats['neutral']['correct'] / stats['neutral']['predicted'] if stats['neutral']['predicted'] > 0 else 0
        neu_f1 = 2 * neu_recall * neu_precision / (neu_recall + neu_precision) if (neu_recall + neu_precision) > 0 else 0
        neu_stats = f"{neu_f1:.2f}F1 ({stats['neutral']['correct']}/{stats['neutral']['total']})"
        
        # Format negative results
        neg_recall = stats['negative']['correct'] / stats['negative']['total'] if stats['negative']['total'] > 0 else 0
        neg_precision = stats['negative']['correct'] / stats['negative']['predicted'] if stats['negative']['predicted'] > 0 else 0
        neg_f1 = 2 * neg_recall * neg_precision / (neg_recall + neg_precision) if (neg_recall + neg_precision) > 0 else 0
        neg_stats = f"{neg_f1:.2f}F1 ({stats['negative']['correct']}/{stats['negative']['total']})"
        
        print(f"{aspect.ljust(20)} | {accuracy:.4f} | {pos_stats.ljust(17)} | {neu_stats.ljust(17)} | {neg_stats.ljust(17)}")
    
    # Generate detailed sentiment lists
    detailed_results = {}
    sentiment_categories = ['correct', 'false_positive', 'false_negative', 'confused']
    
    for aspect in ASPECTS:
        detailed_results[aspect] = {
            'positive': {cat: [] for cat in sentiment_categories},
            'neutral': {cat: [] for cat in sentiment_categories},
            'negative': {cat: [] for cat in sentiment_categories}
        }
    
    # Categorize each prediction
    for idx, (text, aspect, true_sentiment, pred_sentiment) in enumerate(zip(texts, aspect_labels, true_sentiments, pred_sentiments)):
        if true_sentiment == pred_sentiment:
            detailed_results[aspect][true_sentiment]['correct'].append(text)
        elif pred_sentiment == 'positive' and true_sentiment != 'positive':
            detailed_results[aspect]['positive']['false_positive'].append(text)
            detailed_results[aspect][true_sentiment]['false_negative'].append(text)
        elif pred_sentiment == 'negative' and true_sentiment != 'negative':
            detailed_results[aspect]['negative']['false_positive'].append(text)
            detailed_results[aspect][true_sentiment]['false_negative'].append(text)
        elif pred_sentiment == 'neutral' and true_sentiment != 'neutral':
            detailed_results[aspect]['neutral']['false_positive'].append(text)
            detailed_results[aspect][true_sentiment]['false_negative'].append(text)
        else:
            detailed_results[aspect][true_sentiment]['confused'].append(text)
    
    # Save detailed results to Excel
    writer = pd.ExcelWriter('model_test_results.xlsx', engine='xlsxwriter')
    
    # Summary sheet
    summary_data = []
    for aspect in ASPECTS:
        stats = aspect_results[aspect]
        row = {
            'Aspect': aspect,
            'Total Samples': stats['total'],
            'Correct': stats['correct'],
            'Accuracy': stats['correct'] / stats['total'] if stats['total'] > 0 else 0,
            'Positive Total': stats['positive']['total'],
            'Positive Correct': stats['positive']['correct'],
            'Positive Precision': stats['positive']['correct'] / stats['positive']['predicted'] if stats['positive']['predicted'] > 0 else 0,
            'Positive Recall': stats['positive']['correct'] / stats['positive']['total'] if stats['positive']['total'] > 0 else 0,
            'Neutral Total': stats['neutral']['total'],
            'Neutral Correct': stats['neutral']['correct'],
            'Neutral Precision': stats['neutral']['correct'] / stats['neutral']['predicted'] if stats['neutral']['predicted'] > 0 else 0,
            'Neutral Recall': stats['neutral']['correct'] / stats['neutral']['total'] if stats['neutral']['total'] > 0 else 0,
            'Negative Total': stats['negative']['total'],
            'Negative Correct': stats['negative']['correct'],
            'Negative Precision': stats['negative']['correct'] / stats['negative']['predicted'] if stats['negative']['predicted'] > 0 else 0,
            'Negative Recall': stats['negative']['correct'] / stats['negative']['total'] if stats['negative']['total'] > 0 else 0
        }
        summary_data.append(row)
    l
    pd.DataFrame(summary_data).to_excel(writer, sheet_name='Summary', index=False)
    
    # Create sheets for each aspect with example feedbacks
    for aspect in ASPECTS:
        aspect_data = []
        
        # Add correctly classified examples
        for sentiment in SENTIMENTS:
            for text in detailed_results[aspect][sentiment]['correct'][:10]:  # Limit to 10 examples each
                aspect_data.append({
                    'Feedback': text,
                    'True Sentiment': sentiment,
                    'Predicted Sentiment': sentiment,
                    'Classification': 'Correct'
                })
            
            # Add incorrectly classified examples
            for text in detailed_results[aspect][sentiment]['false_negative'][:5]:  # Limit to 5 examples each
                predicted = 'unknown'
                if text in detailed_results[aspect]['positive']['false_positive']:
                    predicted = 'positive'
                elif text in detailed_results[aspect]['neutral']['false_positive']:
                    predicted = 'neutral'
                elif text in detailed_results[aspect]['negative']['false_positive']:
                    predicted = 'negative'
                
                aspect_data.append({
                    'Feedback': text,
                    'True Sentiment': sentiment,
                    'Predicted Sentiment': predicted,
                    'Classification': 'Incorrect'
                })
        
        # Create sheet if we have data
        if aspect_data:
            pd.DataFrame(aspect_data).to_excel(writer, sheet_name=f'{aspect}', index=False)
    
    writer.close()
    print(f"\nDetailed test results saved to 'model_test_results.xlsx'")
    
    return {
        'overall_metrics': overall_metrics,
        'aspect_results': aspect_results,
        'detailed_results': detailed_results
    }

def group_feedbacks_by_sentiment(analysis_results):
   """
   Group feedbacks based on their overall sentiment across aspects
   """
   grouped_feedbacks = {sentiment: [] for sentiment in SENTIMENTS}

   for result in analysis_results:
       # Get aspects that were mentioned in the feedback
       mentioned_aspects = [aspect for aspect, data in result['analysis'].items() if data['mentioned']]

       if not mentioned_aspects:
           # If no aspects were explicitly mentioned, consider all aspects
           mentioned_aspects = list(result['analysis'].keys())

       # Calculate sentiment counts for mentioned aspects
       sentiment_counts = {sentiment: 0 for sentiment in SENTIMENTS}
       for aspect in mentioned_aspects:
           aspect_sentiment = result['analysis'][aspect]['sentiment']
           sentiment_counts[aspect_sentiment] += 1

       # Find the dominant sentiment
       dominant_sentiment = max(sentiment_counts, key=sentiment_counts.get)

       # In case of a tie, use original sentiment or prioritize veterinary_service
       if list(sentiment_counts.values()).count(max(sentiment_counts.values())) > 1:
           # First try to use the original sentiment if available
           if 'original_sentiment' in result and result['original_sentiment'] in SENTIMENTS:
               dominant_sentiment = result['original_sentiment']
           # Otherwise, if veterinary_service is one of the tied sentiments, prioritize it
           elif 'veterinary_care' in mentioned_aspects:
               veterinary_service_sentiment = result['analysis']['veterinary_service']['sentiment']
               if sentiment_counts[veterinary_service_sentiment] == max(sentiment_counts.values()):
                   dominant_sentiment = veterinary_service_sentiment

       # Add to the appropriate group
       grouped_feedbacks[dominant_sentiment].append(result)

   return grouped_feedbacks

def list_sentiment_examples_by_aspect(test_results, output_file="sentiment_examples_by_aspect.xlsx"):
    """
    Generate a detailed list of feedback examples for each aspect and sentiment category
    """
    if not test_results or 'detailed_results' not in test_results:
        print("No valid test results to process.")
        return
    
    detailed_results = test_results['detailed_results']
    
    # Create an Excel writer
    writer = pd.ExcelWriter(output_file, engine='xlsxwriter')
    
    # Create a sheet for each aspect
    for aspect in ASPECTS:
        aspect_data = []
        
        # Add correctly classified positive examples
        positive_correct = detailed_results[aspect]['positive']['correct']
        for text in positive_correct:
            aspect_data.append({
                'Sentiment': 'Positive',
                'Category': 'Correctly Classified',
                'Feedback': text
            })
        
        # Add correctly classified neutral examples
        neutral_correct = detailed_results[aspect]['neutral']['correct']
        for text in neutral_correct:
            aspect_data.append({
                'Sentiment': 'Neutral',
                'Category': 'Correctly Classified',
                'Feedback': text
            })
        
        # Add correctly classified negative examples
        negative_correct = detailed_results[aspect]['negative']['correct']
        for text in negative_correct:
            aspect_data.append({
                'Sentiment': 'Negative',
                'Category': 'Correctly Classified',
                'Feedback': text
            })
        
        # Add misclassified examples
        for sentiment in SENTIMENTS:
            for text in detailed_results[aspect][sentiment]['false_negative']:
                # Determine which sentiment it was incorrectly predicted as
                predicted = "Unknown"
                for s in SENTIMENTS:
                    if s != sentiment and text in detailed_results[aspect][s]['false_positive']:
                        predicted = s
                        break
                
                aspect_data.append({
                    'Sentiment': sentiment.title(),
                    'Category': f'Misclassified as {predicted.title()}',
                    'Feedback': text
                })
        
        # Create a DataFrame and write to sheet
        if aspect_data:
            df = pd.DataFrame(aspect_data)
            df.to_excel(writer, sheet_name=aspect[:31], index=False)  # Excel sheet names limited to 31 chars
    
    # Add a summary sheet
    summary_data = []
    for aspect in ASPECTS:
        for sentiment in SENTIMENTS:
            summary_data.append({
                'Aspect': aspect,
                'Sentiment': sentiment.title(),
                'Correct Examples': len(detailed_results[aspect][sentiment]['correct']),
                'False Positives': len(detailed_results[aspect][sentiment]['false_positive']),
                'False Negatives': len(detailed_results[aspect][sentiment]['false_negative'])
            })
    
    pd.DataFrame(summary_data).to_excel(writer, sheet_name='Summary', index=False)
    
    # Save the Excel file
    writer.close()
    print(f"Sentiment examples by aspect saved to '{output_file}'")
    
    return True

def generate_summary_report(analysis_results, output_file="vet_clinic_feedback_report.xlsx"):
   """
   Generate a summary report of the feedback analysis
   """
   # Group feedbacks by sentiment
   grouped_feedbacks = group_feedbacks_by_sentiment(analysis_results)

   # Create a report DataFrame
   report_data = []

   for result in analysis_results:
       feedback = result['feedback']
       original_sentiment = result.get('original_sentiment', 'N/A')

       # Get the model's predicted sentiments for each aspect
       aspect_sentiments = {}
       for aspect, data in result['analysis'].items():
           aspect_sentiments[f"{aspect}_sentiment"] = data['sentiment']
           aspect_sentiments[f"{aspect}_confidence"] = data['confidence']
           aspect_sentiments[f"{aspect}_mentioned"] = data['mentioned']

       # Determine overall sentiment based on mentioned aspects
       mentioned_aspects = [aspect for aspect, data in result['analysis'].items() if data['mentioned']]
       if not mentioned_aspects:
           mentioned_aspects = list(result['analysis'].keys())

       sentiment_counts = {sentiment: 0 for sentiment in SENTIMENTS}
       for aspect in mentioned_aspects:
           sentiment_counts[result['analysis'][aspect]['sentiment']] += 1

       overall_sentiment = max(sentiment_counts, key=sentiment_counts.get)

       # Add to report data
       row_data = {
           'Feedback': feedback,
           'Original Sentiment': original_sentiment,
           'Model Overall Sentiment': overall_sentiment,
       }
       row_data.update(aspect_sentiments)

       report_data.append(row_data)

   # Create DataFrame and save to Excel
   report_df = pd.DataFrame(report_data)

   # Create an Excel writer
   writer = pd.ExcelWriter(output_file, engine='xlsxwriter')

   # Write the main report sheet
   report_df.to_excel(writer, sheet_name='Detailed Analysis', index=False)

   # Add a summary sheet
   summary_data = {
       'Total Feedbacks': len(analysis_results),
       'Positive Feedbacks': len(grouped_feedbacks['positive']),
       'Neutral Feedbacks': len(grouped_feedbacks['neutral']),
       'Negative Feedbacks': len(grouped_feedbacks['negative']),
   }

   # Calculate percentages for each aspect
   for aspect in ASPECTS:
       aspect_mentioned = sum(1 for result in analysis_results if result['analysis'][aspect]['mentioned'])
       aspect_positive = sum(1 for result in analysis_results
                           if result['analysis'][aspect]['mentioned']
                           and result['analysis'][aspect]['sentiment'] == 'positive')
       aspect_neutral = sum(1 for result in analysis_results
                          if result['analysis'][aspect]['mentioned']
                          and result['analysis'][aspect]['sentiment'] == 'neutral')
       aspect_negative = sum(1 for result in analysis_results
                           if result['analysis'][aspect]['mentioned']
                           and result['analysis'][aspect]['sentiment'] == 'negative')

       summary_data[f'{aspect} Mentioned'] = aspect_mentioned
       summary_data[f'{aspect} Positive'] = aspect_positive
       summary_data[f'{aspect} Neutral'] = aspect_neutral
       summary_data[f'{aspect} Negative'] = aspect_negative

       if aspect_mentioned > 0:
           summary_data[f'{aspect} Positive %'] = aspect_positive / aspect_mentioned * 100
           summary_data[f'{aspect} Neutral %'] = aspect_neutral / aspect_mentioned * 100
           summary_data[f'{aspect} Negative %'] = aspect_negative / aspect_mentioned * 100
       else:
           summary_data[f'{aspect} Positive %'] = 0
           summary_data[f'{aspect} Neutral %'] = 0
           summary_data[f'{aspect} Negative %'] = 0

   # Convert to DataFrame for Excel
   summary_df = pd.DataFrame([summary_data])
   summary_df.to_excel(writer, sheet_name='Summary', index=False)

   # Add sheets for each sentiment group
   for sentiment in SENTIMENTS:
       sentiment_feedbacks = grouped_feedbacks[sentiment]
       if sentiment_feedbacks:
           sentiment_df = pd.DataFrame([{
               'Feedback': result['feedback'],
               'Original Sentiment': result.get('original_sentiment', 'N/A')
           } for result in sentiment_feedbacks])
           sentiment_df.to_excel(writer, sheet_name=f'{sentiment.title()} Feedbacks', index=False)

   # Save the Excel file
   writer.close()
   print(f"Summary report saved to '{output_file}'")

   return report_df

def main():
    """
    Main function to run the feedback analysis system
    """
    import os

    # Initialize model variables
    model, tokenizer = None, None
    last_results = None

    while True:
        print("\n=== VET CLINIC FEEDBACK ANALYSIS SYSTEM ===")
        print("T - Train new model")
        print("L - Load pre-trained model")
        print("S - Analyze single feedback")
        print("A - Analyze feedback from Excel file")
        print("V - Generate visualizations from last analysis")
        print("R - Generate report from last analysis")
        print("E - Test model with dataset (Evaluation)")
        print("Q - Quit")

        choice = input("\nEnter your choice: ").strip().upper()

        if choice == 'Q':
            print("Exiting program. Goodbye!")
            break

        elif choice == 'T':
            # Train new model
            train_path = input("Enter path to training Excel file: ").strip()
            if not os.path.exists(train_path):
                print(f"Error: File not found at {train_path}")
                continue

            try:
                print(f"Training model using data from: {train_path}")
                model, tokenizer = train_model_from_excel(train_path)
                if model and tokenizer:
                    print("Model trained successfully!")
                else:
                    print("Training completed but model initialization failed.")
            except Exception as e:
                print(f"Error during training: {str(e)}")

        elif choice == 'L':             # Load pre-trained model
            try:
                print("Loading pre-trained model...")
                
                # List available model checkpoints
                checkpoint_dir = "../../checkpoints"
                if os.path.exists(checkpoint_dir):
                    checkpoints = [d for d in os.listdir(checkpoint_dir) if d.startswith("model_epoch_")]
                    
                    if not checkpoints:
                        print("No checkpoint models found. Please train the model first.")
                        continue
                        
                    # Display available models
                    print("\nAvailable models:")
                    for i, checkpoint in enumerate(sorted(checkpoints)):
                        print(f"{i+1}. {checkpoint}")
                    
                    print(f"{len(checkpoints)+1}. Default model (vet_clinic_feedback_model)")
                    
                    # Get user choice
                    model_choice = input("\nSelect model number to load: ")
                    
                    try:
                        model_idx = int(model_choice) - 1
                        
                        if 0 <= model_idx < len(checkpoints):
                            # Load selected checkpoint
                            model_path = f"{checkpoint_dir}/{sorted(checkpoints)[model_idx]}"
                            tokenizer_path = model_path.replace("model_", "tokenizer_")
                        elif model_idx == len(checkpoints):
                            # Load default model
                            model_path = "vet_clinic_feedback_model"
                            tokenizer_path = "vet_clinic_feedback_tokenizer"
                        else:
                            print("Invalid selection. Please try again.")
                            continue
                    except ValueError:
                        print("Please enter a valid number.")
                        continue
                else:
                    # Default paths if no checkpoints directory
                    model_path = "vet_clinic_feedback_model"
                    tokenizer_path = "vet_clinic_feedback_tokenizer"
                        
                # Check if selected model exists
                if not os.path.exists(model_path) or not os.path.exists(tokenizer_path):
                    print(f"Error: Selected model files not found at {model_path}")
                    print("Please ensure the model has been trained and saved.")
                    continue
                        
                # Load the selected model
                model = BertForSequenceClassification.from_pretrained(model_path, from_safetensors=True)
                tokenizer = BertTokenizer.from_pretrained(tokenizer_path)
                print(f"Model loaded successfully from {model_path}!")
            except Exception as e:
                print(f"Error loading model: {str(e)}")

        elif choice == 'S':
            # Analyze single feedback
            if not model or not tokenizer:
                print("Model not loaded. Please train or load a model first.")
                continue

            feedback = input("Enter feedback to analyze: ").strip()
            print(f"Analyzing feedback: {feedback}")
            results = [{'feedback': feedback, 'analysis': analyze_feedback(model, tokenizer, feedback)}]

            # Print results for single feedback
            print("\nAnalysis Results:")
            for aspect, data in results[0]['analysis'].items():
                mentioned = "MENTIONED" if data['mentioned'] else "not mentioned"
                print(f"{aspect.replace('_', ' ').title()}: {data['sentiment'].upper()} ({data['confidence']:.2%}) - {mentioned}")
                if data['keywords']:
                    print(f"  Keywords: {', '.join(data['keywords'])}")

            last_results = results

        elif choice == 'A':
            # Analyze feedback from Excel file
            if not model or not tokenizer:
                print("Model not loaded. Please train or load a model first.")
                continue

            file_path = input("Enter path to Excel file with feedback: ").strip()
            if not os.path.exists(file_path):
                print(f"Error: File not found at {file_path}")
                continue

            try:
                print(f"Analyzing feedbacks from file: {file_path}")
                results = analyze_excel_feedbacks(model, tokenizer, file_path)
                print(f"Analysis complete. {len(results)} feedbacks processed.")
                last_results = results
            except Exception as e:
                print(f"Error during analysis: {str(e)}")

        elif choice == 'V':
            # Generate visualizations
            if not 'last_results' in locals() or not last_results:
                print("No analysis results available. Please analyze feedback first.")
                continue

            try:
                print("Generating visualizations...")
                visualize_aspect_sentiments(last_results)
                print("Visualizations generated successfully!")
            except Exception as e:
                print(f"Error generating visualizations: {str(e)}")

        elif choice == 'R':
            # Generate report
            if not 'last_results' in locals() or not last_results:
                print("No analysis results available. Please analyze feedback first.")
                continue

            report_path = input("Enter path for report file (default: vet_clinic_feedback_report.xlsx): ").strip()
            if not report_path:
                report_path = "vet_clinic_feedback_report.xlsx"

            try:
                print(f"Generating report to: {report_path}")
                generate_summary_report(last_results, report_path)
                print(f"Report generated successfully at {report_path}")
            except Exception as e:
                print(f"Error generating report: {str(e)}")


# In the main() function, update the 'E' choice block with this code:

        elif choice == 'E':
            # Test model with dataset
            if not model or not tokenizer:
                print("Model not loaded. Please train or load a model first.")
                continue
                
            test_path = input("Enter path to test Excel file: ").strip()
            if not os.path.exists(test_path):
                print(f"Error: File not found at {test_path}")
                continue
                
            try:
                print(f"Testing model with data from: {test_path}")
                test_results = test_model_with_dataset(model, tokenizer, test_path)
                
                if test_results:
                    print("Model testing completed successfully!")
                    
                    # Generate additional reports
                    print("Generating detailed sentiment examples by aspect...")
                    list_sentiment_examples_by_aspect(test_results, "sentiment_examples_by_aspect.xlsx")
                    
                    print("Generating performance visualizations...")
                    visualize_model_performance(test_results, "model_performance.png")
                    
                    print("\nAll test reports generated successfully:")
                    print("1. model_test_results.xlsx - Overall performance metrics")
                    print("2. sentiment_examples_by_aspect.xlsx - Examples of each sentiment by aspect")
                    print("3. model_performance.png - Visual performance summary")
                    
                    while True:
                        view_choice = input("\nWould you like to view examples for a specific aspect? (Y/N): ").strip().upper()
                        if view_choice == 'N':
                            break
                        elif view_choice == 'Y':
                            print("\nAvailable aspects:")
                            for i, aspect in enumerate(ASPECTS, 1):
                                print(f"{i}. {aspect.replace('_', ' ').title()}")
                            
                            try:
                                aspect_idx = int(input("\nEnter aspect number: ")) - 1
                                if 0 <= aspect_idx < len(ASPECTS):
                                    aspect = ASPECTS[aspect_idx]
                                    print(f"\n== {aspect.replace('_', ' ').title()} Sentiment Examples ==")
                                    
                                    aspect_results = test_results['detailed_results'][aspect]
                                    for sentiment in SENTIMENTS:
                                        print(f"\nCORRECTLY CLASSIFIED {sentiment.upper()} EXAMPLES:")
                                        if aspect_results[sentiment]['correct']:
                                            for i, text in enumerate(aspect_results[sentiment]['correct'][:5], 1):
                                                print(f"{i}. {text}")
                                        else:
                                            print("No examples found.")
                                            
                                        print(f"\nMISCLASSIFIED {sentiment.upper()} EXAMPLES:")
                                        if aspect_results[sentiment]['false_negative']:
                                            for i, text in enumerate(aspect_results[sentiment]['false_negative'][:5], 1):
                                                print(f"{i}. {text}")
                                        else:
                                            print("No examples found.")
                                else:
                                    print("Invalid aspect number.")
                            except ValueError:
                                print("Please enter a valid number.")
                        else:
                            print("Invalid choice. Please enter Y or N.")
                else:
                    print("Testing completed but no results were generated.")
            except Exception as e:
                print(f"Error during testing: {str(e)}")


        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
   main()
