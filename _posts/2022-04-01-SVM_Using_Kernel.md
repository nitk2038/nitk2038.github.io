---
layout: single
title:  "SVM using kernel"
categories: Machine_Learning
tag: [blog, python, coding, Machine_Learning, numpy, sklearn]
toc: false
author_profile: true
sidebar:
    nav: "docs"
---

# SVM (Support Vector Macnine) Using Kernel technique

## Fundamental Concept

![img](/images/2022-04-01-SVM_Using_Kernel/circular_border_line.PNG)

- In SVM, it is difficult to classify data in which the boundary of each label is curved because the decision boundary is a straight line.
- Complex decision boundaries can be learned by applying kernel techniques to SVM.

## Algorithm

- kernel technique: linear regression after transferring data to another feature space
- conditions required to allow linear separation of data that cannot be linearly separated
    - There is a higher dimension space than the learning data, and each point of the learning data corresponds to a point of the higher dimension space.
    - Points corresponding to learning data in a high-dimensional space can be linearly separated, and actual learning data is projection in a high-dimensional space.

![img](/images/2022-04-01-SVM_Using_Kernel/kernel_technique.png)

## Sample Code


```python
from sklearn.svm import SVC
from sklearn.datasets import make_gaussian_quantiles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = make_gaussian_quantiles(n_features = 2, n_classes = 2, n_samples = 300)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3)

model = SVC(gamma = 'auto')

model.fit(X_train, y_train)
y_pred = model.predict(X_test)
accuracy_score(y_pred, y_test)
```




    0.9666666666666667



## difference in learning outcomes using kernel functions

![img](/images/2022-04-01-SVM_Using_Kernel/various_kernel_function.png)
