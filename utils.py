"""
==========================================================
  Object Detection Dataset - Utility Functions
==========================================================
  Project: Object Detection Dataset
  Category: Image Data / Computer Vision
  
==========================================================
  Developer Information
==========================================================
  Website: https://rskworld.in
  Founder: Molla Samser
  Designer & Tester: Rima Khatun
  Email: help@rskworld.in
  Phone: +91 93305 39277
  
  © 2026 RSK World - All Rights Reserved
==========================================================
"""

import os
import json
import cv2
import numpy as np
from pathlib import Path


# Class names and colors for visualization
CLASS_NAMES = [
    'person', 'car', 'dog', 'cat', 'bicycle',
    'motorcycle', 'bus', 'truck', 'bird', 'chair'
]

CLASS_COLORS = [
    (255, 107, 107),   # person - red
    (78, 205, 196),    # car - teal
    (255, 230, 109),   # dog - yellow
    (168, 230, 207),   # cat - mint
    (221, 160, 221),   # bicycle - plum
    (152, 216, 200),   # motorcycle - seafoam
    (247, 220, 111),   # bus - gold
    (133, 193, 233),   # truck - sky blue
    (245, 183, 177),   # bird - coral
    (215, 189, 226),   # chair - lavender
]


def read_yolo_annotation(label_path, img_width, img_height):
    """
    Read YOLO format annotation and convert to pixel coordinates.
    
    Args:
        label_path: Path to the YOLO annotation file (.txt)
        img_width: Width of the corresponding image
        img_height: Height of the corresponding image
        
    Returns:
        List of tuples: (class_id, x1, y1, x2, y2)
    """
    boxes = []
    
    if not os.path.exists(label_path):
        return boxes
    
    with open(label_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
                
            parts = line.split()
            if len(parts) >= 5:
                class_id = int(parts[0])
                x_center = float(parts[1]) * img_width
                y_center = float(parts[2]) * img_height
                width = float(parts[3]) * img_width
                height = float(parts[4]) * img_height
                
                x1 = int(x_center - width / 2)
                y1 = int(y_center - height / 2)
                x2 = int(x_center + width / 2)
                y2 = int(y_center + height / 2)
                
                boxes.append((class_id, x1, y1, x2, y2))
    
    return boxes


def write_yolo_annotation(label_path, boxes, img_width, img_height):
    """
    Write annotations in YOLO format.
    
    Args:
        label_path: Path to save the annotation file
        boxes: List of tuples (class_id, x1, y1, x2, y2) in pixel coordinates
        img_width: Width of the image
        img_height: Height of the image
    """
    with open(label_path, 'w') as f:
        f.write("# Object Detection Dataset - YOLO Annotation\n")
        f.write("# Website: https://rskworld.in | Founder: Molla Samser\n")
        
        for class_id, x1, y1, x2, y2 in boxes:
            x_center = ((x1 + x2) / 2) / img_width
            y_center = ((y1 + y2) / 2) / img_height
            width = (x2 - x1) / img_width
            height = (y2 - y1) / img_height
            
            f.write(f"{class_id} {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n")


def yolo_to_coco(yolo_dir, output_path, image_dir=None):
    """
    Convert YOLO annotations to COCO format.
    
    Args:
        yolo_dir: Directory containing YOLO annotation files
        output_path: Path to save the COCO JSON file
        image_dir: Directory containing images (optional)
    """
    coco_data = {
        "info": {
            "description": "Object Detection Dataset",
            "url": "https://rskworld.in",
            "version": "1.0",
            "year": 2026,
            "contributor": "RSK World - Molla Samser",
            "date_created": "2026-01-01"
        },
        "licenses": [
            {
                "id": 1,
                "name": "Free for Educational Use",
                "url": "https://rskworld.in/terms"
            }
        ],
        "categories": [
            {"id": i, "name": name, "supercategory": "object"}
            for i, name in enumerate(CLASS_NAMES)
        ],
        "images": [],
        "annotations": []
    }
    
    image_id = 0
    annotation_id = 0
    
    for label_file in Path(yolo_dir).glob('*.txt'):
        image_name = label_file.stem + '.jpg'
        
        # Get image dimensions if available
        img_width, img_height = 640, 480  # default
        if image_dir:
            img_path = Path(image_dir) / image_name
            if img_path.exists():
                img = cv2.imread(str(img_path))
                if img is not None:
                    img_height, img_width = img.shape[:2]
        
        image_id += 1
        coco_data["images"].append({
            "id": image_id,
            "file_name": image_name,
            "width": img_width,
            "height": img_height
        })
        
        boxes = read_yolo_annotation(str(label_file), img_width, img_height)
        
        for class_id, x1, y1, x2, y2 in boxes:
            annotation_id += 1
            width = x2 - x1
            height = y2 - y1
            
            coco_data["annotations"].append({
                "id": annotation_id,
                "image_id": image_id,
                "category_id": class_id,
                "bbox": [x1, y1, width, height],
                "area": width * height,
                "segmentation": [],
                "iscrowd": 0
            })
    
    with open(output_path, 'w') as f:
        json.dump(coco_data, f, indent=2)
    
    print(f"COCO annotations saved to: {output_path}")
    print(f"Total images: {len(coco_data['images'])}")
    print(f"Total annotations: {len(coco_data['annotations'])}")


def visualize_annotations(image_path, label_path=None, output_path=None):
    """
    Visualize bounding box annotations on an image.
    
    Args:
        image_path: Path to the image file
        label_path: Path to the YOLO annotation file (optional, auto-detected if None)
        output_path: Path to save the visualized image (optional)
        
    Returns:
        Annotated image as numpy array
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")
    
    h, w = img.shape[:2]
    
    # Auto-detect label path
    if label_path is None:
        img_path = Path(image_path)
        label_path = img_path.parent.parent / 'labels' / (img_path.stem + '.txt')
    
    boxes = read_yolo_annotation(str(label_path), w, h)
    
    for class_id, x1, y1, x2, y2 in boxes:
        color = CLASS_COLORS[class_id % len(CLASS_COLORS)]
        label = CLASS_NAMES[class_id] if class_id < len(CLASS_NAMES) else f"class_{class_id}"
        
        # Draw bounding box
        cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
        
        # Draw label background
        (text_width, text_height), baseline = cv2.getTextSize(
            label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2
        )
        cv2.rectangle(
            img,
            (x1, y1 - text_height - 10),
            (x1 + text_width + 10, y1),
            color,
            -1
        )
        
        # Draw label text
        cv2.putText(
            img, label,
            (x1 + 5, y1 - 5),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6, (255, 255, 255), 2
        )
    
    if output_path:
        cv2.imwrite(output_path, img)
        print(f"Annotated image saved to: {output_path}")
    
    return img


def dataset_statistics(data_dir):
    """
    Calculate and print dataset statistics.
    
    Args:
        data_dir: Root directory of the dataset
    """
    data_path = Path(data_dir)
    
    stats = {
        'train_images': 0,
        'valid_images': 0,
        'train_annotations': 0,
        'valid_annotations': 0,
        'class_counts': {name: 0 for name in CLASS_NAMES}
    }
    
    # Count training data
    train_labels = data_path / 'train' / 'labels'
    if train_labels.exists():
        for label_file in train_labels.glob('*.txt'):
            stats['train_images'] += 1
            boxes = read_yolo_annotation(str(label_file), 1, 1)  # Dimensions don't matter for counting
            stats['train_annotations'] += len(boxes)
            for class_id, *_ in boxes:
                if class_id < len(CLASS_NAMES):
                    stats['class_counts'][CLASS_NAMES[class_id]] += 1
    
    # Count validation data
    valid_labels = data_path / 'valid' / 'labels'
    if valid_labels.exists():
        for label_file in valid_labels.glob('*.txt'):
            stats['valid_images'] += 1
            boxes = read_yolo_annotation(str(label_file), 1, 1)
            stats['valid_annotations'] += len(boxes)
            for class_id, *_ in boxes:
                if class_id < len(CLASS_NAMES):
                    stats['class_counts'][CLASS_NAMES[class_id]] += 1
    
    # Print statistics
    print("\n" + "="*60)
    print("  OBJECT DETECTION DATASET STATISTICS")
    print("  Website: https://rskworld.in")
    print("="*60)
    print(f"\nTraining Set:")
    print(f"  - Images: {stats['train_images']}")
    print(f"  - Annotations: {stats['train_annotations']}")
    print(f"\nValidation Set:")
    print(f"  - Images: {stats['valid_images']}")
    print(f"  - Annotations: {stats['valid_annotations']}")
    print(f"\nTotal:")
    print(f"  - Images: {stats['train_images'] + stats['valid_images']}")
    print(f"  - Annotations: {stats['train_annotations'] + stats['valid_annotations']}")
    print(f"\nClass Distribution:")
    for name, count in stats['class_counts'].items():
        bar = '█' * min(count // 10, 30)
        print(f"  {name:12s}: {count:5d} {bar}")
    print("="*60)
    
    return stats


def create_sample_annotation(image_path, output_dir):
    """
    Create a sample annotation file for an image.
    This generates random bounding boxes for demonstration purposes.
    
    Args:
        image_path: Path to the image
        output_dir: Directory to save the annotation
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")
    
    h, w = img.shape[:2]
    
    # Generate 2-4 random boxes
    num_boxes = np.random.randint(2, 5)
    boxes = []
    
    for _ in range(num_boxes):
        class_id = np.random.randint(0, len(CLASS_NAMES))
        
        # Random box dimensions (10-40% of image)
        box_w = np.random.uniform(0.1, 0.4) * w
        box_h = np.random.uniform(0.1, 0.4) * h
        
        # Random position
        x1 = np.random.uniform(0, w - box_w)
        y1 = np.random.uniform(0, h - box_h)
        x2 = x1 + box_w
        y2 = y1 + box_h
        
        boxes.append((class_id, int(x1), int(y1), int(x2), int(y2)))
    
    # Save annotation
    img_name = Path(image_path).stem
    label_path = Path(output_dir) / f"{img_name}.txt"
    write_yolo_annotation(str(label_path), boxes, w, h)
    
    print(f"Created sample annotation: {label_path}")
    return boxes


if __name__ == "__main__":
    # Example usage
    print("\n" + "="*60)
    print("  OBJECT DETECTION DATASET UTILITIES")
    print("  RSK World - https://rskworld.in")
    print("  Founder: Molla Samser")
    print("  Designer & Tester: Rima Khatun")
    print("="*60)
    
    # Calculate dataset statistics
    dataset_statistics('.')
    
    print("\nAvailable functions:")
    print("  - read_yolo_annotation(label_path, img_width, img_height)")
    print("  - write_yolo_annotation(label_path, boxes, img_width, img_height)")
    print("  - yolo_to_coco(yolo_dir, output_path, image_dir)")
    print("  - visualize_annotations(image_path, label_path, output_path)")
    print("  - dataset_statistics(data_dir)")
    print("  - create_sample_annotation(image_path, output_dir)")

