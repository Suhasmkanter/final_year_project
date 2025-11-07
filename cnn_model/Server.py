from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
from keras.models import load_model


brain_tumor_labels = ['glomia', 'meningioma', 'notumor', 'pituitary']
IMAGE_SIZE = 128

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load your trained Sequential model
# -----------------------------
model = load_model('new_final_year_model.h5')


# -----------------------------
# Prediction endpoint
# -----------------------------
@app.route('/predict', methods=['POST'])
def predict():
    if 'images' not in request.files:
        return jsonify({"message": "No images uploaded"}), 400

    image_files = request.files.getlist('images')
    results = []

    for image_file in image_files:
        img = Image.open(image_file.stream).convert('RGB')
        img = img.resize((IMAGE_SIZE, IMAGE_SIZE))
        img_array = np.array(img) / 255.0
        img_array_exp = np.expand_dims(img_array, axis=0)

        # Model prediction
        predictions = model.predict(img_array_exp)
        predicted_class_index = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        predicted_label = brain_tumor_labels[predicted_class_index]

        # Prepare full probabilities array
        probabilities = predictions[0].tolist()  # convert to plain Python list
        datavalues = {}
        for i, value in enumerate(probabilities):
             datavalues[brain_tumor_labels[i]] = value


        results.append({
            "filename": image_file.filename,
            "result": "Negative" if predicted_class_index == 2 else f"{predicted_label} Positive",
            "disease": predicted_label,
            "confidence": round(confidence, 2),
            "probabilities": datavalues,       # full array of class probabilities
            "model_name": model.name,
            "image_pixels": img_array.tolist()    # full image pixel array
        })

    return jsonify({"predictions": results}), 200

# -----------------------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)