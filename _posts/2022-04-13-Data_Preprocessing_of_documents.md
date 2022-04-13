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

# Data Preprocessing of documents

## TF-IDF (Term Frequency - Inverse Document Frequency)

- TF-IDF is a weight used in information retrieval and text mining, and is a statistical value indicating how important a word is within a particular document when there are multiple document groups.
- TF (Term frequency) is a value that indicates how often a particular word appears within a document, and the higher this value, the more important it is in the document.
- However, if the word itself is frequently used within the document group, this means that the word appears frequently. This is called DF (document frequency), and the inverse of this value is called IDF (inverse document frequency).


```python
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.datasets import fetch_20newsgroups

categories = [
    'alt.atheism', 'soc.religion.christian',
    'comp.graphics', 'sci.med'
]

remove = ('headers', 'footers', 'quotes')

twenty_train = fetch_20newsgroups(
subset = 'train',
remove = remove,
categories = categories)

twenty_test = fetch_20newsgroups(
subset = 'test',
remove = remove,
categories = categories)
```


```python
count_vect = CountVectorizer()
X_train_counts = count_vect.fit_transform(twenty_train.data)
X_test_count = count_vect.transform(twenty_test.data)

model = LinearSVC(max_iter = 20000)
model.fit(X_train_counts, twenty_train.target)
predicted = model.predict(X_test_count)

print(np.mean(predicted == twenty_test.target))
```

    0.7423435419440746
    


```python
tf_vec = TfidfVectorizer()
X_train_tfidf = tf_vec.fit_transform(twenty_train.data)
X_test_tfidf = tf_vec.transform(twenty_test.data)

model = LinearSVC(max_iter = 20000)
model.fit(X_train_tfidf, twenty_train.target)
predicted = model.predict(X_test_tfidf)

print(np.mean(predicted == twenty_test.target))
```

    0.8149134487350199
    


```python

```
