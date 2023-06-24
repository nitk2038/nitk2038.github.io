---
layout: single
title:  "Graph Convolutional Networks (GCN)"
categories: paper_review
tag: [Deep_Learning, python, GCN]
toc: true
toc_sticky: true
author_profile: true
---

# Semi-Supervised Classification With Graph Convolutional Networks, ICLR 2017

## Graph Convolutional Networks (GCN)을 이용한 준지도학습 분류

## 저자
- Thomas N.Kipf
- Max Welling

## 0. Preliminary Knowledge

### 1. 테이블 데이터
- Table 형태, 우리가 흔히 생각하는 Excel Chart이다.
- 다른 말로, Tabular Data라 한다.


![Tabular_Data](https://www.statology.org/wp-content/uploads/2022/03/tabular1.jpg)

### 2. 그래프 데이터
- Graph 형태, 위 예시 테이블에서 각 행(row)이 노드(vertex)가 되고, 연관이 있는 경우 엣지(edge)를 만든다.


![Graph_Data](https://media.geeksforgeeks.org/wp-content/cdn-uploads/undirectedgraph.png)

### 3. 그래프 데이터 저장 방식
- 인접행렬 (Adjacency Matrix)
    - 그래프의 노드 갯수가 N개 라고 하자
    - 그러면 인접행렬의 크기는 $N \times N$이 된다.
    - 각 행고 열은 해당 노드의 index가 된다.
    - 아래 그림과 같이, 0번 노드가 1, 2, 3, 4와 연결되어 있으면, 연결이 되어있다는 의미에서 1로 표기되고, 0번 노드가 자기 자신과 5번 노드와는 연결되어 있지 않으므로, 0으로 표기된다.


![Adjacency_Matrix](https://media.geeksforgeeks.org/wp-content/uploads/20200604170814/add-and-remove-edge-in-adjacency-matrix-representation-initial1.jpg)

- Graph Feature Matrix
    - 그래프 노드들의 피쳐(feature, attribute)들을 노드 index 순서대로 나열한 것
    - 아래 그림 참조


![Feature_Matrix](https://blog.kakaocdn.net/dn/kRrEC/btqCB7CyV6S/uCtmLrJVKGokjWXDEtIUNK/img.png)

- Graph Degree Matrix
    - 각 노드가 얼마나 많은 엣지를 가지고 있는지, 즉, 얼마나 많은 이웃 노드를 가지고 있는지 계산한 행렬
    - 인접행렬 행들의 모든 요소를 더한 값이 해당 노드의 Degree가 됨
    - 기본적으로, Degree Matrix는 대각 성분에 해당 노드의 Degree를 나타냄


![Degree_Matrix](/images/2023-06-24-Graph_Convolutional_Networks/degree_matrix.png)

## 1. Introduction

### 1. 풀고자 하는 Task
- Classification: 노드 분류
- Semi-Supervised: 노드의 일부만 labeling 되어 있음

### 2. 기본 Notation
- 그래프 (Graph): $G=(V, E)$
    - $V$: 그래프의 노드 혹은 정점 (Vertex), $v_i \in V$
    - $E$: 그래프의 엣지 혹은 간선 (Edge), $(v_i, v_j) \in \epsilon$
- 인접행렬 (Adjacency Matrix): $A \in \mathcal{R}^{N \times N}$
- 피쳐행렬 (Feature MAtrix): $X$
- 차수행렬 (Degree Matrix): $D_{ij} = \sum_{j} A_{ij}$
- Neural Network Model Function: $f(\cdot)$, $f(X, A)$
- 손실 함수 (Loss Function): $L = L_0 + L_{reg}$
    - $L_0$: 지도학습 손실 함수, i.e. Cross-Entropy Loss
    - $L_{reg}$: graph Laplacian Regularization, 지금은 엣지 간의 가중치를 조정하기 위한 항(term)이라는 정도로만 이해
- Unnormalized graph Laploacian Regularization: $\Delta=D-A$
    - 학습을 통해 조정된 엣지 가중치의 변화량을 측정하기 위한 항(term)

### 3. Contribution
- spectral graph convolution 연산에 근사하는 layer-wise propagation rule 제안
- 즉, spectral convolution 연산을 근사시킬 수 있는 세로운 수식을 제안함으로써, 연산 시간을 줄임
- 기존 GNN 모델에 비해 fast하고 scalable한 모델 제안

## 2. Fast Approximate Convolutions on Graphs

### 1. Layer-Wise Linear Model

## 3. Semi-Supervised Node Classification

### 1. Explanation

## 4. Results
<p></p>

## 5. Conclusion
<p></p>
