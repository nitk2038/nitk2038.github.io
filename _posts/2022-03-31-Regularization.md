---
layout: single
title:  "Regularization"
categories: MachineLearning
tag: [python, coding, machine_learning, numpy, sklearn]
toc: true
toc_sticky: true
author_profile: true

---

# Regularization

## Fundamental concept

- Normalization is used as a way to prevent over-fitting of the model.
- In over-fitting, the error between the execution result and the correct answer data is very small, but the error between the result of executing the model with test data and the correct answer data is very large.

## Sample Code


```python
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error

train_size = 20

test_size = 12

train_X = np.random.uniform(low = 0, high = 1.2, size = train_size)
test_X = np.random.uniform(low = 0.1, high = 1.3, size = test_size)

train_y = np.sin(train_X * 2 *np.pi) + np.random.normal(0, 0.2, train_size)
test_y = np.sin(test_X * 2 * np.pi) + np.random.normal(0, 0.2, test_size)

poly = PolynomialFeatures(6)

train_poly_X = poly.fit_transform(train_X.reshape(train_size, 1))
test_poly_X = poly.fit_transform(test_X.reshape(test_size, 1))

model = Ridge(alpha = 1.0)

model.fit(train_poly_X, train_y)

train_pred_y = model.predict(train_poly_X)
test_pred_y = model.predict(test_poly_X)

print(mean_squared_error(train_pred_y, train_y))
print(mean_squared_error(test_pred_y, test_y))
```

    0.14826465725405447
    0.40761309030001885
    


```python

```

#### 참고문헌

- 秋庭伸也 et al. 머신러닝 도감 : 그림으로 공부하는 머신러닝 알고리즘 17 / 아키바 신야, 스기야마 아세이, 데라다 마나부 [공] 지음 ; 이중민 옮김, 2019.