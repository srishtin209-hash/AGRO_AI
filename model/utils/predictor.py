import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# load AI model
model = load_model("model/plant_disease_model.h5")

labels = [
    "Tomato___Late_blight",
    "Tomato___Healthy",
    "Potato___Early_blight",
    "Potato___Healthy"
]

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0) / 255.0

    prediction = model.predict(img)
    index = np.argmax(prediction)

    return {
        "disease": labels[index],
        "confidence": float(np.max(prediction))
    }