---
layout: single
title:  "GraphSAGE"
categories: paper_review
tag: [Deep_Learning, python, GCN]
toc: true
toc_sticky: true
author_profile: true
---

# Inductive Representation Learning on Large Graphs, NIPS 2017

## 거대 그래프를 위한 Inductive 학습 기법

## 저자
- Wiliam L. Hamilton
- Rex Ying
- Jure Leskovec

## 0. Preliminary Knowledge
### 1. Graph??
- [그래프 데이터란?](https://meongju0o0.github.io/data_structure/Graph/)

### 2. Transductive Learning vs Inductive Learning
- [Transductive Learning vs Inductive Learning](https://meongju0o0.github.io/Machine_Learning/transductive-vs-inductive/)

## 1. Introduction
### 1. 기존 고차원 노드 피쳐 벡터 임베딩 기법
- 머신러닝 기반 임베딩 방법을 주로 사용
- 이때, 사용되는 데이터는 오직 노드 피쳐 벡터
    - 머신러닝 기법: PCA, NMA, t-SNE
- 위와 같은 기법으로 임베딩 된 피쳐는 node classification, clustering, link prediction 등에 사용

- 혹은, ChebNet, GCN과 같은 Transductive 딥러닝 기법을 사용
    - Transductive 성질로 인해, 실세계에 적용시키기 어려운 한계점을 지님
        - 미니배치 학습 불가
        - 온라인 학습 불가
        - 분산 학습 불가
        - 시간 효율성 떨어짐
        - 메모리 부족 문제

### 2. 제안하는 Inductive Learning Method 장점
- 미니배치 학습 가능
- 온라인 학습 및 추론 가능
    - 실세계에서 응용될 수 있음

## 2. 제안 기법: GraphSAGE


## 3. 실험


## 4. 결론


## 5. 참고문헌
- [https://proceedings.neurips.cc/paper_files/paper/2017/hash/5dd9db5e033da9c6fb5ba83c7a7ebea9-Abstract.html](https://proceedings.neurips.cc/paper_files/paper/2017/hash/5dd9db5e033da9c6fb5ba83c7a7ebea9-Abstract.html)
