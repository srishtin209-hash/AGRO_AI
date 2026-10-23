# Plant Disease Detection Model

This directory should contain your trained TensorFlow/Keras model file.

**File**: `plant_disease_model.h5`

**Model Specifications**:
- Framework: TensorFlow/Keras
- Input Shape: (224, 224, 3)
- Output: Probability scores for each disease class
- Supported Classes: healthy, bacterial_spot, early_blight, late_blight, leaf_mold, septoria_leaf_spot, spider_mites, target_spot, yellow_leaf_curl_virus, mosaic_virus

**Training Requirements**:
- Use image size 224x224 for training
- Normalize pixel values to [0,1] range
- Include preprocessing: resize and normalize

**Note**: Replace this file with your actual trained model before deployment.