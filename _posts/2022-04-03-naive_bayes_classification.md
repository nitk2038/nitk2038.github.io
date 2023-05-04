---
layout: single
title:  "Naive Bayes Classification"
categories: Machine_Learning
tag: [blog, python, coding, Machine_Learning, numpy, sklearn]
toc: true
toc_sticky: true
author_profile: true

---

# Naive Bayes Classification

## Fundamental Concept

- The Naive Bayes classification is one of the algorithms for predicting results based on probability.
- Calculate the probability of which label the data belongs and classify the data into the label with the highest probability.

## Algorithm

### Data Preprocessing

- When dealing with the classification problem of natural language processing into the Naive Bayes classification, input data must be converted into a vector composed of features.
- The preprocessing in this example is to convert the article title to BoW (Bag of Words) and then create a vector consisting of feature and label pairs.

- First, only nouns are extracted from the article title of the learning data. At this time, the word order is ignored and treated as a set.
|학습데이터|카테고리|
|:---:|:---:|
|{"감동", "명작", "영화"}|영화|
|{"화려", "액션", "영화"}|영화|
|{"명작", "세계", "감동"}|영화|
|{"모래 폭풍", "화성"}|우주|
|{"화성", "탐사", "재개"}|우주|
|{"VR", "탐사", "재개"}|우주|

<br>

- Second, Change the word set and category of the feature to be easy to handle.
- When the learning data includes words in a set of words, add 1 and 0 when not included.

|학습데이터|명작|영화|화려|액션|세계|감동|모래 폭풍|화성|탐사|재개|VR|카테고리|
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|감동을 준 명작 영화가 부활|1|1|0|0|0|1|0|0|0|0|0|1|
|화려한 액션 영화가 개봉|0|1|1|1|0|0|0|0|0|0|0|1|
|명작의 부활에 세계가 감동|1|0|0|0|1|1|0|0|0|0|0|1|
|모래 폭풍이 화성을 덮다|0|0|0|0|0|0|1|1|0|0|0|0|
|마침내 화성 탐사 재개|0|0|0|0|0|0|0|1|1|1|0|0|
|VR로 보는 화성의 모래 폭풍과 감동|0|0|0|0|0|1|0|1|1|0|1|0|

- As shown in the table above, a pair of features and labels is called BoW depending on whether there is a word in a natural language sentence.

<br>

- Third, The test data is also converted to BoW.

|학습데이터|명작|영화|화려|액션|세계|감동|모래 폭풍|화성|탐사|재개|VR|카테고리|
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|부활한 명작에서 보여주는 액션에 감동|1|0|0|1|0|1|0|0|0|0|0|??|

### Calculate probability

- When learning by the Naive Bayes classification, two types of probabilities are calculated.
    - a. probability of each label appearing
    - b. conditional probability of each word appearing on each label
    - calculate a * b

## Sample Code


```python
from sklearn.naive_bayes import MultinomialNB

X_train = [[1,1,0,0,0,1,0,0,0,0,0],
          [0,1,1,1,0,0,0,0,0,0,0],
          [1,0,0,0,1,1,0,0,0,0,0],
          [0,0,0,0,0,0,1,1,0,0,0],
          [0,0,0,0,0,0,0,1,1,1,0],
          [0,0,0,0,0,1,0,1,1,0,1]]

y_train = [1,1,1,0,0,0]

model = MultinomialNB()
model.fit(X_train, y_train)
model.predict([[1,0,0,1,0,1,0,0,0,0,0]])
```




    array([1])


