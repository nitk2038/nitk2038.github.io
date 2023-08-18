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
- [그래프 데이터란?](https://meongju0o0.github.io/data-structure/Graph/)

### 2. Transductive Learning vs Inductive Learning
- [Transductive Learning vs Inductive Learning](https://meongju0o0.github.io/Machine_Learning/transductive-vs-inductive/)

## 1. Introduction
### 1. 기존 고차원 노드 피쳐 벡터 임베딩 기법
- 머신러닝 기반 임베딩 방법을 주로 사용
- 이때, 사용되는 데이터는 오직 노드 피쳐 벡터
    - 머신러닝 기법: PCA, NMA, t-SNE
- 위와 같은 기법으로 임베딩 된 피쳐는 Node Classification,  Clustering, Link Prediction 등에 사용

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
    - 실세계 거대 그래프에서 응용될 수 있음

### 3. GraphSAGE 특징
- 노드 임베딩을 구하기 위해 사용되는 범용적 framework
- Inductive Learning Model은 Neighborhood Sampling과 Aggregation 과정을 통해 노드 임베딩을 구함
- Aggregation은 이웃 노드 피쳐와 최종 레이어의 임베딩 결과를 도출
- 최종 임베딩 결과는 NN Model Parameter Update에 사용
- unsupervised, supervised 모두 가능

## 2. 관련 연구
### 1. Factorization-based embedding approaches
- low dimensional embeddings using random walk
    - baseline algorithm: PageRank Algorithm
    - Deepwalk: Online learning of social representations. In KDD, 2014.
    - node2vec: Scalable feature learning for networks. In KDD, 2016.

- matrix factorization-based learning objectives
    - baseline algorithm: Planetoid-$I$
    - Line: Large-scale information network embedding. In WWW, 2015.
    - Structural deep network embedding. In KDD, 2016.

### 2. Supervised learning over graphs
- supervised learning over graph-structured data
    - Discriminative embeddings of latent variable models for structured data. In ICML, 2016.
    - A new model for learning in graph domains. In IEEE International Joint Conference on Neural Networks, volume 2, pages 729–734, 2005.
    - Gated graph sequence neural networks. In ICLR, 2015.
    - The graph neural network model. IEEE Transactions on Neural Networks, 20(1):61–80, 2009.

### 3. Spectral Graph Convolutional Networks
- Spectral Method Based Graph Convolutional Networks
    - Spectral Networks and Locally Connected Networks on Graphs
    - Convolutional Neural Networks on Graphs with Fast Localized Spectral Filtering
    - Semi-Supervised Classification with Graph Convolutional Networks

## 3. 제안 기법: GraphSAGE
- 핵심 아이디어
    - 이웃 노드들을 무작위 추출 (샘플링)
    - 임베딩을 구하고자 하는 노드의 지엽적 이웃의 피쳐 정보를 Aggregate하여 NN 모델 학습
    - GD(Gradient Descent)만 가능한 기존 Spectral Method 기반 GCN과 달리, SGD(Stochastic Gradient Descent)가 가능

![https://production-media.paperswithcode.com/methods/1b38ceba-a031-474f-a39f-26abc1735e0b.png](https://production-media.paperswithcode.com/methods/1b38ceba-a031-474f-a39f-26abc1735e0b.png)

### 1. 임베딩 생성 알고리즘 (GraphSAGE Forward Propagation Algorithm)
#### Notations
- Graph: $G(V, E)$
- input features: $x_v$
- depth: $K$
- neighborhood: $N:v\to{2^v}$
- $K$ aggregator functions: $AGGREGATE_k, \forall{k}\in{1, ..., K}$
- set of weight matrices: $W^k, \forall{k}\in{1, ..., K}$
    - used to propagate information between different layers of the model or "search depths"
- non-linearity activation: $\sigma$

#### GraphSAGE Forward Propagation Algorithm
![img](/images/2023-07-03-GraphSAGE/GraphSAGE_forward_propagation_algorithm.png)

## 3. 실험


## 4. 결론


## 5. 참고문헌
- [https://proceedings.neurips.cc/paper_files/paper/2017/hash/5dd9db5e033da9c6fb5ba83c7a7ebea9-Abstract.html](https://proceedings.neurips.cc/paper_files/paper/2017/hash/5dd9db5e033da9c6fb5ba83c7a7ebea9-Abstract.html)
