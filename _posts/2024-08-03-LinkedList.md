---
layout: single
title:  "자료구조, Linked List 1편, Singly Linked List"
categories: DataStructure
tag: [data_structure, c++]
toc: true
toc_sticky: true
author_profile: true
---

# Singly Linked List

## 링크드 리스트(Linked List)
- Sorted List에서 삽입, 삭제 연산을 빠르게 하기 위함
- Sorted List이어도 삽입, 삭제 연산보다 탐색 연산이 빈번하면 Array가 더 유리한 경우가 많음
- array는 연속적인 메모리 주소 마다 item을 저장하는 한편, linked list는 노드 당 1개의 item을 저장하고 각 노드는 다음 노드로 갈 수 있는 포인터를 가지고 있음
- 이때, n번재 item을 탐색하기 위해서는 1번째 포인터, 2번째 포인터, n-1번째 포인터를 모두 거쳐야 하므로 탐색에서는 불리

![doubly_linked_list](/images/2024-08-03-LinkedList/Doubly-Linked-List-in-Data-Structure.webp)

## 링크드 리스트(Linked List)에 필요한 Operator
- Constructor
    - Linked List 객체 생성을 위한 생성자
- Destructor
    - Linked List 객체 삭제를 위한 소멸자
- Transformer
    - Linked List의 상태를 변환하는 변환자
- Observer
    - Linked List의 아이템이나 길이 등의 정보에 접근하기 위한 관측자

## Singly Linked List(SLL)
- Doubly Linked List에 앞서 특수한 상황을 위한 Linked List
- 말이 특수한 상황이지, Doubly Linked List보다 제한적인 기능을 가진 자료구조
    - ~~개인적인 생각으로, Singly Linked List를 써도 되는 상황에서는 성능상 이점이 있을 수 있겠지만, 그 이점이 그다지 크다고는 생각 안함~~

![singly_linked_list](/images/2024-08-03-LinkedList/LLdrawio.png)

### Singly Linked List Search Algorithm
- 위 그림에서 Head를 현재 노드의 Next 포인터를 따라 한 칸씩 이동시키며 탐색

- 3번 째 item을 찾고자 한다면 아래와 같이 코드를 작성할 수 있을 것
    - Node라는 별도의 구조체와 SLL이라는 클래스틑 이미 있다고 가정하자

```cpp
Node* cur_node = SLL.get_root(); // cur_node->item == 'A'
for(int i = 0; i < 2; i++) {
    cur_node = cur_node->next;
}
// 0번째 iteration 종료 시, cur_node->item == 'B'
// 1번째 iteration 종료 시, cur_node->item == 'C'
cout << cur_node->item;
```

### Singly Linked List Insertion Algorithm

### Naive Idea
- naive하게 접근해보자
    - ~~그냥 날로 접근해보자~~

- 새로운 노드를 'B'와 'C' 사이에 넣을려고 한다
- 우선 새로운 객체를 생성해야겠지?
- 'B'노드의 next 포인터는 새로운 객체를 가르켜야 하고
- 새로운 객체의 next 포인터는 'C'노드를 가르켜야 한다
- 근데 'B'노드의 next 포인터를 먼저 새로운 객체를 가르키고 나니 'C' 노드의 행방이 묘연해졌다.
- 이에 대한 2가지 솔루션이 있다
    - Solution 1.
        - 무지성으로 접근하면 temp_ptr을 생성해서 'C' 노드로의 포인터를 저장
    - Solution 2.
        - 반대로 새로운 객체의 next 포인터가 'C'를 먼저 가르키게 한 뒤 'B' 노드의 next포인터가 새로운 객체를 가르키게 한다
    - 당연히 'Solution 2'가 교과서적인 접근이다.

- '너무 쉽고도 당연한 solution 아닌가?' 라고 생각될 수 있으나, Doubly Linked List의 Insertion 알고리즘에도 동일하게 적용되는 아이디어이다. 막상 Doubly Linked List를 보면 Insertion의 순서가 마냥 쉽게 떠올르진 않을 것이다. (적어도 나는 그랬다)

### Singly Linked List(SLL)에 필요한 Operators
- Constructor
- Destructor
- Transformers
    - insert
    - erase
- Observers
    - is_empty
    - is_full
    - size

## Source Code
### Preprocessing
