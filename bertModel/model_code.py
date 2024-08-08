""" 
BERT for sentiment analysis
step1: import the existing pre-trained model (BERT base or large)
step2: fine-tune it by adding classification layer to the top of pre-trained model
step3:tokenise and pad your texts. Also add labels to the texts
step4:Train this to the model using optimiser, loss function
step5: Evaluate the model


"""





import pandas as pd
import torch
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score


df = pd.read_csv(r'C:\Users\prana\bertaurant\bertModel\Restaurant_Reviews.tsv', delimiter='\t') #2 columns: Review, Liked
train_df, val_df = train_test_split(df, test_size=0.2, random_state=42)


tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)


optimizer = AdamW(model.parameters(), lr=2e-5, no_deprecation_warning=True)   #to change weights 
num_epochs = 1







# Training loop
for epoch in range(num_epochs):
    model.train()                      #layers like dropout layer behave differentl while training and evaluating
    total_loss = 0

    for i, row in train_df.iterrows():
        review = row['Review']
        label = row['Liked']

        encoding = tokenizer(review, truncation=True, padding=True, return_tensors='pt')
        input_ids = encoding['input_ids']
        attention_mask = encoding['attention_mask']

        optimizer.zero_grad()                     # gradients from the previous iteration do not affect the current iteration.
        outputs = model(input_ids, attention_mask=attention_mask, labels=torch.tensor([label]))    
        loss = outputs.loss
        total_loss += loss.item()
        loss.backward()
        optimizer.step() 

    average_loss = total_loss / len(train_df)
    print(f'Epoch {epoch + 1}/{num_epochs}, Train Loss: {average_loss:.4f}')




# Tokenised review is  {'input_ids': tensor([[  101,  1996,  5409,  2001,  1996, 11840, 24511, 27605,  1012,   102]]), 
# 'token_type_ids': tensor([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]),
#  'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])}


# output is  SequenceClassifierOutput(loss=tensor(0.7565, grad_fn=<NllLossBackward0>), 
# logits=tensor([[-0.0315,  0.0914]], grad_fn=<AddmmBackward0>), 
# hidden_states=None, attentions=None)




# Evaluate the model on the validation set
model.eval()
val_labels = []
val_predictions = []

for i, row in val_df.iterrows():
    review = row['Review']
    label = row['Liked']

    encoding = tokenizer(review, truncation=True, padding=True, return_tensors='pt')
    input_ids = encoding['input_ids']
    attention_mask = encoding['attention_mask']

    outputs = model(input_ids, attention_mask=attention_mask)
    logits = outputs.logits 
    predictions = torch.argmax(logits, dim=1)

    val_labels.append(label)                    #actual label
    val_predictions.append(predictions.item())  #predicted label

# Calculate evaluation metrics
accuracy = accuracy_score(val_labels, val_predictions)
classification_report_str = classification_report(val_labels, val_predictions)

print(f'Validation Accuracy: {accuracy:.4f}')
print(classification_report_str)










# Define a function to predict sentiment
def predict_sentiment(input_text):
    # Tokenize the input text
    encoding = tokenizer(input_text, truncation=True, padding=True, return_tensors='pt')
    input_ids = encoding['input_ids']
    attention_mask = encoding['attention_mask']

    # Pass the input through the model
    model.eval()
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
    
    # Get the predicted class (0 for negative, 1 for positive)
    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=1).item()

    # Determine the sentiment based on the predicted class
    if predicted_class == 0:
        return "Negative"
    else:
        return "Positive"
    
    
# logits:[ 0.2371, -0.0864]
# maximum is 0.2371, output will be negative



    

# Example usage:
new_input_text = "I really enjoyed the food at that restaurant."
sentiment = predict_sentiment(new_input_text)
print(f"Predicted Sentiment: {sentiment}")