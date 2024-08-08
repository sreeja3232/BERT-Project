

from flask import Flask, request, jsonify
from model_code import predict_sentiment


app = Flask(__name__)
@app.route('/predict', methods=['POST'])


def predict():
    try:
        data = request.get_json()
        
        # Use BERT model for prediction
        input_text = data['text']
        prediction = predict_sentiment(input_text)


        # label = "positive" if prediction == 1 else "negative"
        return jsonify({"sentiment": prediction})


    except Exception as e:
        print(e)
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5000)