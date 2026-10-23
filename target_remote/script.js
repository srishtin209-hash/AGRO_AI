/* ============================================
   AgroAI - JavaScript Functionality
   ============================================ */

// Current language setting
let currentLanguage = localStorage.getItem('language') || 'en';

function initializeApp() {
    initializeSidebar();
    initializeDragDrop();
    setupLanguageSwitching();
    setLanguage(currentLanguage);
    fetchWeatherData();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

/* ============================================
   SIDEBAR FUNCTIONALITY
   ============================================ */

function initializeSidebar() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeBtn');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768) {
            if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Set active nav item
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

/* ============================================
   DRAG & DROP FUNCTIONALITY
   ============================================ */

function initializeDragDrop() {
    const dragDropZone = document.getElementById('dragDropZone');
    const fileInput = document.getElementById('fileInput');

    if (!dragDropZone) return;

    // Click to select
    dragDropZone.addEventListener('click', function() {
        fileInput.click();
    });

    // Drag over
    dragDropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dragDropZone.classList.add('dragover');
    });

    dragDropZone.addEventListener('dragleave', function() {
        dragDropZone.classList.remove('dragover');
    });

    // Drop
    dragDropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dragDropZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            handleFileSelect(this.files[0]);
        }
    });
}

function handleFileSelect(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewContainer = document.getElementById('previewContainer');
        const previewImage = document.getElementById('previewImage');
        
        if (previewContainer && previewImage) {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

function clearPreview() {
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    
    if (fileInput) fileInput.value = '';
    if (previewContainer) previewContainer.style.display = 'none';
}

/* ============================================
   LANGUAGE SWITCHING
   ============================================ */

function setupLanguageSwitching() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('data-label') === 'language') {
                e.preventDefault();
                toggleLanguageMenu(e);
            }
        });
    });
}

function toggleLanguageMenu(event) {
    event.preventDefault();
    const languageMenu = document.getElementById('languageMenu');
    if (languageMenu) {
        const isVisible = languageMenu.style.display === 'none' || languageMenu.style.display === '';
        languageMenu.style.display = isVisible ? 'block' : 'none';
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-hi][data-kn]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update button text
    const buttons = document.querySelectorAll('.btn[data-en]');
    buttons.forEach(button => {
        const text = button.getAttribute(`data-${lang}`);
        if (text) {
            button.textContent = text;
        }
    });

    // Close language menu
    const languageMenu = document.getElementById('languageMenu');
    if (languageMenu) {
        languageMenu.style.display = 'none';
    }

    // Update nav items text
    const navTexts = document.querySelectorAll('.nav-text');
    navTexts.forEach(text => {
        const content = text.getAttribute(`data-${lang}`);
        if (content) {
            text.textContent = content;
        }
    });

    console.log('Language changed to:', lang);
}

/* ============================================
   WEATHER FUNCTIONALITY
   ============================================ */

function fetchWeatherData() {
    const weatherContent = document.getElementById('weatherContent');
    
    if (!weatherContent) return;

    fetch('/api/weather')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayWeather(data);
            } else {
                displayWeatherError();
            }
        })
        .catch(error => {
            console.error('Weather error:', error);
            displayWeatherError();
        });
}

// Store weather data globally for modal
let currentWeatherData = {};

function displayWeather(data) {
    const weatherContent = document.getElementById('weatherContent');
    currentWeatherData = data; // Store for modal
    
    const weatherHTML = `
        <div class="weather-info">
            <div class="weather-icon">${getWeatherIcon(data.weather)}</div>
            <div>
                <div class="weather-label" data-en="Weather" data-hi="मौसम" data-kn="ಹವಾಮಾನ">Weather</div>
                <div class="weather-value">${data.weather}</div>
            </div>
        </div>
        <div class="weather-info">
            <div class="weather-label" data-en="Location" data-hi="स्थान" data-kn="ಸ್ಥಳ">Location</div>
            <div class="weather-value">${data.location}</div>
        </div>
        <div class="weather-info">
            <div class="weather-label" data-en="Temperature" data-hi="तापमान" data-kn="ತಾಪಮಾನ">Temperature</div>
            <div class="weather-value">${data.temperature}°C</div>
        </div>
        <div class="weather-info">
            <div class="weather-label" data-en="Humidity" data-hi="आर्द्रता" data-kn="ಆರ್ದ್ರತೆ">Humidity</div>
            <div class="weather-value">${data.humidity}%</div>
        </div>
    `;
    
    weatherContent.innerHTML = weatherHTML;
}

function showWeatherDetails() {
    const modal = document.getElementById('weatherModal');
    const detailsContent = document.getElementById('weatherDetailsContent');
    
    if (!currentWeatherData.location) {
        detailsContent.innerHTML = '<p style="color: #b0b0b0;">No weather data available. Please try again.</p>';
    } else {
        const detailedHTML = `
            <div style="display: grid; gap: 20px;">
                <div style="padding: 15px; background: rgba(46, 213, 115, 0.1); border-radius: 15px; border-left: 4px solid #2ed573;">
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Location</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-top: 5px;">${currentWeatherData.location}</div>
                </div>
                <div style="padding: 15px; background: rgba(46, 213, 115, 0.1); border-radius: 15px; border-left: 4px solid #2ed573;">
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Weather Condition</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-top: 5px;">${getWeatherIcon(currentWeatherData.weather)} ${currentWeatherData.weather}</div>
                </div>
                <div style="padding: 15px; background: rgba(46, 213, 115, 0.1); border-radius: 15px; border-left: 4px solid #2ed573;">
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Temperature</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-top: 5px;">${currentWeatherData.temperature}°C</div>
                </div>
                <div style="padding: 15px; background: rgba(46, 213, 115, 0.1); border-radius: 15px; border-left: 4px solid #2ed573;">
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Humidity</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-top: 5px;">${currentWeatherData.humidity}%</div>
                </div>
            </div>
        `;
        detailsContent.innerHTML = detailedHTML;
    }
    
    modal.style.display = 'flex';
}

function closeWeatherDetails() {
    const modal = document.getElementById('weatherModal');
    modal.style.display = 'none';
}

function getWeatherIcon(condition) {
    const weather = condition.toLowerCase();
    if (weather.includes('clear')) return '☀️';
    if (weather.includes('cloud')) return '☁️';
    if (weather.includes('rain')) return '🌧️';
    if (weather.includes('storm')) return '⛈️';
    if (weather.includes('snow')) return '❄️';
    if (weather.includes('mist') || weather.includes('fog') || weather.includes('haze')) return '🌫️';
    return '🌤️';
}

function displayWeatherError() {
    const weatherContent = document.getElementById('weatherContent');
    weatherContent.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #b0b0b0;">
            <p data-en="🌦️ Weather data unavailable" data-hi="🌦️ मौसम डेटा उपलब्ध नहीं है" data-kn="🌦️ ಹವಾಮಾನ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ">🌦️ Weather data unavailable</p>
            <p style="font-size: 0.9rem; margin-top: 10px;" data-en="Please check your internet connection" data-hi="कृपया अपना इंटरनेट कनेक्शन जांचें" data-kn="ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಂಟರನೆಟ್ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ">Please check your internet connection</p>
        </div>
    `;
}

/* ============================================
   SCROLL TO SECTION
   ============================================ */

function scrollToSection(sectionId, event) {
    if (event) {
        event.preventDefault();
    }

    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Close sidebar on mobile
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth < 768 && sidebar) {
            sidebar.classList.remove('active');
        }
    }
}

/* ============================================
   FORM SUBMISSION
   ============================================ */

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const fileInput = document.getElementById('fileInput');
        
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please select an image to analyze');
            return;
        }
        
        // Show loading state
        const resultsSection = document.getElementById('results-section');
        const resultCard = document.getElementById('resultCard');
        const resultContent = document.getElementById('resultContent');
        
        resultsSection.style.display = 'block';
        resultContent.innerHTML = '<p>🔄 Analyzing your plant image...</p>';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Create FormData for AJAX submission
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        
        // Submit via AJAX
        fetch('/predict', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Display results
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            resultContent.innerHTML = '<p style="color: #ff4757;">❌ Error analyzing image. Please try again.</p>';
        });
    });
}

/* ============================================
   DISPLAY RESULTS
   ============================================ */

function displayResults(data) {
    const resultContent = document.getElementById('resultContent');
    const resultCard = document.getElementById('resultCard');
    
    if (data.error) {
        resultContent.innerHTML = `<p style="color: #ff4757;">❌ ${data.error}</p>`;
        return;
    }
    
    let borderColor = '#95a5a6';
    if (data.color === 'red') borderColor = '#ff4757';
    else if (data.color === 'yellow') borderColor = '#ffa502';
    else if (data.color === 'green') borderColor = '#2ed573';
    
    resultCard.style.borderLeft = `8px solid ${borderColor}`;
    
    const severityLabel = `${data.severity.charAt(0).toUpperCase()}${data.severity.slice(1).toLowerCase()} Risk`;
    
    const resultHTML = `
        <div class="result-grid">
            <div class="result-image-container">
                <img src="${data.image}" alt="${data.disease}" class="result-image">
                <div class="image-label" data-en="Uploaded leaf image" data-hi="अपलोड की गई पत्ती की छवि" data-kn="ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಎಲೆ ಚಿತ್ರ">Uploaded leaf image</div>
            </div>
            <div class="result-info">
                <div class="result-header">
                    <h3 class="disease-name">${data.disease}</h3>
                    <span class="severity-badge severity-${data.color}">${data.severity.charAt(0).toUpperCase()}${data.severity.slice(1).toLowerCase()} Risk</span>
                </div>
                <div class="result-meta">
                    <span class="result-confidence">Confidence: ${data.confidence}</span>
                    <span class="result-timestamp">${data.timestamp}</span>
                </div>
                <p class="result-summary">${data.description}</p>
            </div>
        </div>
        
        <div class="result-details">
            <div class="detail-item">
                <h3>🔍 Causes</h3>
                <ul>
                    ${data.causes.map(cause => `<li>${cause}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-item">
                <h3>🌿 Symptoms</h3>
                <ul>
                    ${data.description.split('.').filter(s => s.trim()).map(symptom => `<li>${symptom.trim()}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-item">
                <h3>🛡️ Prevention</h3>
                <ul>
                    ${data.prevention.map(prev => `<li>${prev}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-item">
                <h3>💊 Treatment</h3>
                <ul>
                    ${data.treatment.map(treat => `<li>${treat}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="result-actions">
            <button class="btn btn-secondary" onclick="resetAnalysis()">🔄 Analyze Another Plant</button>
            <button class="btn btn-primary" onclick="scrollToSection('#tips-section')">💡 View Prevention Tips</button>
        </div>
    `;
    
    resultContent.innerHTML = resultHTML;
}

/* ============================================
   RESET ANALYSIS
   ============================================ */

function resetAnalysis() {
    // Hide results section
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'none';
    
    // Clear file input and preview
    clearPreview();
    
    // Scroll back to upload section
    scrollToSection('#upload-section');
}

/* ============================================
   RESPONSIVE MENU
   ============================================ */

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});