---
layout: single
title:  "Data Preprocessing of Documents"
categories: coding
tag: [blog, python, coding, Machine_Learning, pandas, numpy, sklearn]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# Converting Image Data

![img](/images/2022-04-13-Data_Preprocessing_of_Documents/MNIST.png)

- The brightness value of the image data pixel of each number is converted into vector data and used.


```python
from PIL import Image
import numpy as np

img = Image.open('zero_image.png').convert('L')

width, height = img.size

img_pixels = []

for y in range(height):
    for x in range(width):
        img_pixels.append(img.getpixel((x, y)))
        
print(img_pixels)
```

    [255, 255, 170, 34, 102, 238, 255, 255, 255, 255, 34, 0, 85, 0, 170, 255, 255, 204, 0, 221, 255, 68, 119, 255, 255, 187, 51, 255, 255, 119, 119, 255, 255, 170, 119, 255, 255, 102, 119, 255, 255, 187, 68, 255, 238, 51, 136, 255, 255, 221, 17, 170, 85, 51, 255, 255, 255, 255, 153, 34, 85, 255, 255, 255]
    


```python
from sklearn import datasets
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier

digits = datasets.load_digits()
n_samples = len(digits.images)
data = digits.images.reshape((n_samples, -1))

model = RandomForestClassifier(n_estimators = 10)
model.fit(data[:n_samples // 2], digits.target[:n_samples // 2])

expected = digits.target[n_samples // 2:]
predicted = model.predict(data[n_samples // 2:])

print(metrics.classification_report(expected, predicted))
```

                  precision    recall  f1-score   support
    
               0       0.90      0.98      0.93        88
               1       0.84      0.88      0.86        91
               2       0.89      0.88      0.89        86
               3       0.88      0.87      0.87        91
               4       0.90      0.83      0.86        92
               5       0.78      0.86      0.82        91
               6       0.91      0.93      0.92        91
               7       0.91      0.92      0.92        89
               8       0.83      0.68      0.75        88
               9       0.81      0.83      0.82        92
    
        accuracy                           0.87       899
       macro avg       0.87      0.87      0.86       899
    weighted avg       0.87      0.87      0.86       899
    
    
