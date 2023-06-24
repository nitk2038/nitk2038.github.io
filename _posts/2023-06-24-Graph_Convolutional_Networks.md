---
layout: single
title:  "Graph Convolutional Networks"
categories: paper_review
tag: [Deep_Learning, python, GCN]
toc: true
toc_sticky: true
author_profile: true
---

# Semi-Supervised Classification With Graph Convolutional Networks, ICLR 2017

## Graph Convolutional Networks(GCN)을 이용한 준지도학습 분류

## 저자
- Thomas N.Kipf
- Max Welling

## 1. Introduction
- 풀고자 하는 Task
    - Classification: 노드 분류
    - Semi-Supervised: 노드의 일부만 labeling 되어 있음

- 기본 Notation
    - 그래프 (Graph): $G=(V, E)$
        - $V$: 그래프의 노드 혹은 정점 (Vertex)
        - $E$: 그래프의 엣지 혹은 간선 (Edge)
    - Neural Network Parameters: $f(\cdot)$
    - 손실 함수 (Loss Function): $L = L_0 + L_{reg}$
        - $L_0$: 지도학습 손실 함수, i.e. Cross-Entropy Loss
        - $L_{reg}$: graph Laplacian Regularization, 지금은 엣지 간의 가중치를 조정하기 위한 항이라는 정도로만 이해
    - Unnormalized graph Laploacian Regularization: $\Delta=D-A$
