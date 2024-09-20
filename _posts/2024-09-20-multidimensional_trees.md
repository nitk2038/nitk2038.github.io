---
layout: single
title:  "BST(Binary Search Tree)와 KD트리 그리고 B트리와 R트리"
categories: DataStructure
tag: [data_structure, c++]
toc: true
toc_sticky: true
author_profile: true
---

# BST(Binary Search Tree)와 KD트리 그리고 B트리와 R트리
## multidimensional indexing techniques(다차원 인덱싱 기법들)
컴퓨터공학과 2학년 이상이라면 자료구조 수업을 들었을 것이다. 그리고 그 수업에서 BST(Binary Search Tree, 이진탐색트리)도 다들 배웠을 것이다.

이진탐색트리는 상당히 매력적인 자료구조라 생각한다. BST를 사용하면 기존 Unsorted List의 O(N) Complexity를 O(logN) Complexity로 확연히 감소시켜준다.

하지만 문제가 있다. 기존 자료구조 수업에서 BST를 다룰 때 어떻게 했었는가? BST 노드 하나 당 하나의 item만 삽입이 가능했다. 노드 하나 당 여러 item을 삽입시킨다 하여도 결국 정렬은 하나의 아이템을 기준으로 하거나 기껏해봐야 lexicographic order(사전식 순서)로만 정렬이 가능했다.

> **lexicographic order, 2개 속성일때 코드 예**

```cpp
bool cmp(const tuple<int, int>& a, const tuple<int, int>& b) const {
    if(get<0>(a) != get<0>(b)) {
        return get<0>(a) < get<0>(b);
    }
    else {
        return get<1>(a) < get<1>(b);
    }
}
```

<br/>
아래 테이블을 생각해보자. Name에 대해서는 정렬이 이루어져 있다. BST인지 아닌지를 떠나, 정렬이 되어 있는 상태에서는 이진탐색을 활용해 O(logN) Complexity로 탐색이 가능하니 Name에 대해서 'Eve'를 찾을 때는 O(logN) Complexity를 보장해준다.

하지만 몸무게가 50kg인 사람을 찾고싶으면? 순차탐색이 최선이다. 즉, O(N) Complexity가 최선이라는 것이다.

| ID  | Name   | Age | Height | Weight | Country  |
| --- | ------ | --- | ------ | ------ | -------- |
| 1   | Alice  | 25  | 165cm  | 55kg   | USA      |
| 2   | Bob    | 30  | 180cm  | 80kg   | Canada   |
| 3   | Charlie| 35  | 175cm  | 70kg   | UK       |
| 4   | David  | 28  | 170cm  | 68kg   | Australia|
| 5   | Eve    | 22  | 160cm  | 50kg   | Germany  |

이름에 대해 O(logN) Complexity를 보장해주면서 Weight에 대해서도 O(logN) Complexity를 보장해주고 싶으면 어떻게 해야할까?

앞으로 소개할 KD트리와 R트리는 이러한 한계점을 극복하기 위해 등장한 자료구조이다. 이들은 다차원 데이터를 효율적으로 탐색할 수 있게 해준다. 예를 들어 KD트리는 k차원 공간(k-Dimension)에서의 효율적인 탐색을 위한 구조로, 다양한 속성을 동시에 고려한 탐색이 가능하다.

## BST, 결국 기본은 BST
### BST란 무엇인가?
<p align="center"><img src = "/images/2024-09-20-multidimensional_trees/bst.png"></p>

- 이진탐색트리(BST, Binary Search Tree)는 아래와 같은 속성이 있는 이진트리 자료구조이다.
    - 각 노드에 값이 있다.
    - 값들은 전순서가 있다.(정렬이 가능하다.)
    - 노드의 왼쪽 서브트리에는 그 노드의 값보다 작은 값들을 지닌 노드들로 이루어져 있다.
    - 노드의 오른쪽 서브트리에는 그 노드의 값보다 큰 값들을 지닌 노드들로 이루어져 있다.
    - 좌우 하위 트리는 각각이 다시 이진탐색트리여야 한다.

### BST에서 탐색은?
- 위 그림을 예시로 보자. 아이템 '13'을 찾고자 하면 어떻게 해야할까?
- 탐색하고자 하는 값을 루트 노드(최상위 노드, 예시에서 '8')와 먼저 비교하고 일치할 경우 루트 노드를 반환
    - 불일치하고 탐색하고자 하는 값이 루트 노드의 값보다 작을 경우 왼쪽 서브 트리에서 재귀적으로 탐색
    - 불일치하고 탐색하고자 하는 값이 루트 노드의 값보다 큰 경우 오른쪽 서브 트리에서 재귀적으로 탐색

- 위와같은 탐색 방식으로 O(logN) Time Complexity를 보장해줄 수 있다.

### BST에서 삽입연산은 어떻게?
- 삽입 전, 검색을 수행한다.
- 트리를 검색한 후 키와 일치하는 노드가 없으면 마지막 노드에서 키와 노드의 크기를 비교하여 왼쪽이나 오른쪽 노드에 새로운 노드를 삽입한다.
    - 마지막 노드보다 큰 경우 말단 노드의 오른쪽에 새로운 노드 삽입
    - 마지막 노드보다 작은 경우 말단 노드의 왼쪽에 새로운 노드 삽입
        - 말단 노드(terminal node): 자식노드가 없는 노드(예시에서 '1', '4', '7', '13')

- 삽입연산도 마찬가지로 O(logN) Time Complexity를 보장할 수 있다.

### BST에서 삭제연산
- 삭제하려는 노드의 자식 수에 따라
    - 자식 노드가 없는 노드(말단 노드) 삭제: 해당 노드를 단순히 삭제
    - 자식 노드가 1개인 노드 삭제: 해당 노드를 삭제하고 그 위치에 삭제된 노드의 서브트리를 대입
    - 자식 노드가 2개인 노드 삭제: 삭제하고자 하는 노드의 값을 해당 노드의 왼쪽 서브트리에서 가장 큰 값으로 변경하거나, 오른쪽 서브 트리에서 가장 작은 값으로 변경한 뒤, 해당 노드를 삭제

- 삭제연산 또한 O(logN) Time complexity를 보장해준다.

### 한계점
1. 항상 O(logN) Complexity를 보장해주지 않는다.
    - 극단적으로, skewed tree의 경우, O(N) Time Complexity가 되어버린다.
    ![skewed_tree](/images/2024-09-20-multidimensional_trees/skewed_tree.png)
    - 이를 개선하기 위해, AVL트리나 Red-Black트리와 같은 자료구조도 존재한다.
2. 다차원 속성에서는 적용이 불가능하다.
    - 이를 개선하기 위해 k-D트리와 같은 자료구조가 존재한다.

## KD트리, BST를 다차원으로
### KD트리(k-Dimensional tree)
- 종류: 다차원 BST
- 발명일: 1975
- 발명자: 존 벤틀리

- k차원 공간의 점들을 구조화하는 공간 분할 자료구조
- 중심 데이터포인트를 기준으로 분할 초평면을 만들어 트리 생성
- BST(Binary Search Tree)와 유사하나, k-Dimension 상의 데이터를 트리로 구축할 수 있음
- BST를 x축에 대해서 수행 -> y축에 대해서 수행 -> z축에 대해서 수행 -> x축에 대해서 수행 -> y축에 대해서 ...

### k-D Tree Construction Algorithm
- Precondition
    - 2차원 실수 공간 (X측, Y축)

<ol>
    <li>X축에 대해 정렬한 후 중앙값을 기준으로 배열 분할</li>
    <ul>
        <li>Y축에 대해 먼저 정렬하여 분할할 수도 있음</li>
        <li>이는 각 축의 분산에 의해 결정됨</li>
    </ul>
    <p align="center"><img src = "/images/2024-09-20-multidimensional_trees/k-d-construction-1.jpg"></p>
    <li>Y축에 대해 정렬한 후 중앙값을 기준으로 배열 분할</li>
    <p align="center"><img src = "/images/2024-09-20-multidimensional_trees/k-d-construction-2.jpg"></p>
    <li>위 과정을 반복하면서 트리 생성</li>
    <p align="center"><img src = "/images/2024-09-20-multidimensional_trees/k-d-construction-3.jpg"></p>
    <p align="center"><img src = "/images/2024-09-20-multidimensional_trees/k-d-construction.png"></p>
</ol>

### K-D Tree Nearest Neighbor Search Algorithm
<ol>
    <li>새로운 점이 트리의 어디에 삽입되어야 하는지 탐색</li>
    <p align="center"><img src = "/images/2024-09-20-multidimensional_trees/k-d-search.png"></p>
    <li>도달한 리프 노드를 기준으로 자신이 속한 subtree를 우선적으로 탐색</li>
    <ul>
        <li>자신이 속한 subtree에서 k개의 최근접 이웃을 모두 탐색하지 못한 경우, 부모 노드의 subtree에서 순회</li>
    </ul>
</ol>

### Time Complexity
- Time Complexity(Notations)
    - Dimension: $D$
    - Number of Vectors: $N$

- Time Complexity(Building)
    - 추가할 point가 어느 subtree에 위치하는지 탐색: $O(DlogN)$
    - 총 벡터 n개를 만족할 때가지 트리 구축: $O(N)$
    - 최종 Time Complexity: $O(DNlogN)$

- Time Complexity(Search)
    - 평균적인 복잡도
        - 추가할 point가 어느 subtree에 위치하는지 탐색: $O(DlogN)$
    - 최악의 경우, i.e. Skewed Tree
        - 추가할 point가 어느 subtree에 위치하는지 탐색: $O(DN)$

## B트리, 다시 1차원으로

## R트리, B트리를 다차원으로

### 참고 문헌
- Wikipedia. (2024.08.18). "전순서 집합". [https://ko.wikipedia.org/wiki/전순서_집합](https://ko.wikipedia.org/wiki/전순서_집합).
- Wikipedia. (2024.06.03). "사전식 순서". [https://ko.wikipedia.org/wiki/사전식_순서](https://ko.wikipedia.org/wiki/사전식_순서).
- Wikipedia. (2023.05.13). "이진 탐색 트리". [https://ko.wikipedia.org/wiki/이진_탐색_트리](https://ko.wikipedia.org/wiki/이진_탐색_트리).
- Wikipedia. (2024.05.16). "k-d 트리". [https://ko.wikipedia.org/wiki/K-d_트리](https://ko.wikipedia.org/wiki/K-d_트리).
- cjkangme.log. “[3D] KD Tree와 BVH” 2024.01.11. [https://velog.io/@cjkangme/3D-KD-Tree와-BVH](https://velog.io/@cjkangme/3D-KD-Tree와-BVH)
- Geetha Mattaparthi. "Ball tree and KD Tree Algorithms" 2024.01.23. [https://medium.com/@geethasreemattaparthi/ball-tree-and-kd-tree-algorithms-a03cdc9f0af9](https://medium.com/@geethasreemattaparthi/ball-tree-and-kd-tree-algorithms-a03cdc9f0af9)
- OpenAI. (2024). ChatGPT(Aug 8, 2024). GPT-4o. [https://chat.openai.com](https://chat.openai.com).
