# 🎯 Object Detection Dataset v1.0.0

## Release Highlights

### ✨ Features
- **1000+ high-quality annotated images** with precise bounding boxes
- **10 object classes**: person, car, dog, cat, bicycle, motorcycle, bus, truck, bird, chair
- **5000+ bounding box annotations** with pixel-perfect accuracy
- **YOLO format (.txt)** annotations ready for YOLOv5/v7/v8
- **COCO format (.json)** annotations for Detectron2 and other frameworks
- **Interactive web demo** with annotation playground
- **Dataset statistics dashboard** with Chart.js visualizations
- **Training/Validation split** (80/20) pre-configured

### 🛠️ Technologies
- **Image formats**: PNG, JPG (high resolution)
- **Annotation formats**: YOLO, COCO, Pascal VOC
- **Compatible frameworks**: OpenCV, YOLOv5/v7/v8, Detectron2, MMDetection
- **Web technologies**: HTML5, CSS3, JavaScript, Chart.js

### 📊 Dataset Statistics
| Metric | Value |
|--------|-------|
| Total Images | 1000+ |
| Training Set | 800 images (80%) |
| Validation Set | 200 images (20%) |
| Total Annotations | 5000+ |
| Object Classes | 10 |

### 📦 What's Included
- `index.html` - Interactive web demo with playground
- `style.css` - Modern UI styling
- `script.js` - Interactive features
- `data.yaml` - YOLO configuration file
- `annotations.json` - COCO format annotations
- `classes.txt` - Class labels
- `utils.py` - Python utility functions
- `train/` - Training images and labels
- `valid/` - Validation images and labels
- `LICENSE` - MIT License
- `README.md` - Documentation

### 🚀 Quick Start
```bash
# Download and extract
unzip object-detection.zip -d ./data/

# Install dependencies
pip install ultralytics opencv-python

# Train with YOLOv8
yolo train model=yolov8n.pt data=data.yaml epochs=100
```

### 📜 License
MIT License - Free for personal, educational, and commercial use with attribution.

---

## 👤 Developer Information

| | |
|---|---|
| 🌐 **Website** | [rskworld.in](https://rskworld.in) |
| 👤 **Founder** | Molla Samser |
| 🎨 **Designer & Tester** | Rima Khatun |
| 📧 **Email** | help@rskworld.in |
| 📱 **Phone** | +91 93305 39277 |

---

**© 2026 RSK World - All Rights Reserved**

Made with ❤️ by [RSK World](https://rskworld.in)

