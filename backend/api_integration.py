#Backend API integration using Flask
from flask import Flask, request, jsonify
import cv2
import numpy as np
import joblib
import pandas as pd
import os

from flask_cors import CORS
app = Flask(__name__)
CORS(app)

model = joblib.load('food_rf_model.pkl')
nutrition_df = pd.read_csv('nutrition_data.csv')
nutrition_dict = nutrition_df.set_index('food').T.to_dict()
classes = list(nutrition_dict.keys())

def extract_color_histogram_from_file(file_stream, bins=(8,8,8)):
    file_bytes = np.asarray(bytearray(file_stream.read()), dtype=np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0,1,2], None, bins, [0,180,0,256,0,256])
    cv2.normalize(hist, hist)
    return hist.flatten()

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image_file = request.files['image']
    features = extract_color_histogram_from_file(image_file)
    features = features.reshape(1, -1)
    pred = model.predict(features)[0]
    conf = max(model.predict_proba(features)[0])
    nutrition = nutrition_dict.get(pred, {})
    return jsonify({
        'food': pred,
        'confidence': conf,
        'nutrition': nutrition
    })

import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # use Render's port if set, else 5000 locally
    app.run(host='0.0.0.0', port=port, debug=True)

