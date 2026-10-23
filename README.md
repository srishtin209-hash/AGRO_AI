# AgroAI - Plant Disease Detection

A modern web application for plant disease detection using TensorFlow AI, built with Flask and featuring a dark futuristic agriculture theme.

## Features

- **Real AI Disease Detection**: Uses TensorFlow/Keras model for accurate plant disease classification
- **Modern Dark UI**: Futuristic agriculture-themed interface with smooth animations
- **Image Upload & Preview**: Drag-and-drop file upload with instant image preview
- **Comprehensive Results**: Disease name, confidence percentage, severity, symptoms, causes, treatment, and prevention
- **Weather Integration**: Real-time weather data display
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Fast Analysis**: Quick processing with loading animations

## Technology Stack

- **Backend**: Flask (Python)
- **AI/ML**: TensorFlow/Keras, NumPy, Pillow
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with gradients, animations, and glassmorphism effects
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd agroai
pip install -r requirements.txt
```

### 2. Prepare the AI Model

Place your trained TensorFlow model in the `model/` directory:

```
model/
└── plant_disease_model.h5
```

**Model Requirements:**
- Input shape: (224, 224, 3)
- Output: Probability scores for each disease class
- Classes should match the disease names in `app.py`

### 3. Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

### 4. Weather API (Optional)

To enable real weather data, update the `get_weather_data()` function in `app.py` with your OpenWeatherMap API key:

```python
api_key = "your_actual_api_key_here"
```

## Deployment to Render

### Files Required for Render:
- `requirements.txt` (already included)
- `Procfile` (already included)
- Your `plant_disease_model.h5` file in the `model/` directory

### Deployment Steps:
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Deploy!

## Project Structure

```
agroai/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── Procfile              # Render deployment config
├── templates/
│   └── index.html        # Main UI template
├── model/
│   └── plant_disease_model.h5  # TensorFlow model (add this)
└── uploads/              # Temporary upload directory (auto-created)
```

## Disease Classes Supported

The application currently supports detection of the following plant diseases:

- Healthy Plant
- Bacterial Spot
- Early Blight
- Late Blight
- Leaf Mold
- Septoria Leaf Spot
- Spider Mites
- Target Spot
- Yellow Leaf Curl Virus
- Mosaic Virus

## API Endpoints

- `GET /` - Main application page
- `POST /analyze` - Analyze uploaded plant image
- `GET /weather` - Get current weather data

## Current Status

✅ **Complete**: Flask backend with TensorFlow AI integration  
✅ **Complete**: Modern dark theme UI matching reference design  
✅ **Complete**: Image upload, processing, and analysis  
✅ **Complete**: Weather integration  
✅ **Complete**: Responsive design with animations  
✅ **Complete**: Render deployment configuration  
⏳ **Pending**: Add your trained `plant_disease_model.h5` to the `model/` directory  

**Demo Mode**: The app currently runs in demo mode (filename-based prediction) until you add the TensorFlow model.