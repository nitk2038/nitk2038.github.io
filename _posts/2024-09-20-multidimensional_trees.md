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

> lexicographic order
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

아래 테이블을 생각해보자. Name에 대해서는 정렬이 이루어져 있다. BST인지 아닌지를 떠나, 정렬이 되어 있는 상태에서는 O(logN) Complexity로 탐색이 가능하니 Name에 대해서 'Eve'를 찾을 때는 O(logN) Complexity를 보장해준다.

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