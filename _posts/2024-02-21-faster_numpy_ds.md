---
layout: single
title:  "numpy가 더 빠른 이유-자료구조 관점에서"
categories: ComputerArchitecture
tag: [computer_architecture, python]
toc: true
toc_sticky: true
author_profile: true
---

# numpy가 더 빠른 이유
## 너무 바쁜 파이선
numpy 이야기를 하기 전에, 파이선 이야기를 먼저 하고자 한다. [numpy 10배 더 빠르게 쓰기](https://meongju0o0.github.io/computerarchitecture/faster_numpy/) 포스트의 내용을 살펴보면 numpy int32는 python list보다 34배 넘게 더 빠르다. SIMD만 고려해 생각해보면 속도차이가 없어야 할 것 같다.

~~*물론 파이선 3.11 기준으로 integer 자료형의 크기는 28바이트나 된다. 경우에 따라 더 커질 수도 있다.*~~

~~*더럽게 무거운 놈인 것은 확실하다.*~~

다시 제목으로 돌아가서, 왜 **너무 바쁜 파이선**이라는 제목을 붙였을까?

python list는 array가 아니다. 겉으로 생긴 것은 C++, JAVA, C# 배열과 비슷하지만, 내부 구조는 다르다.

### C++ array(numpy array)
```
int arr[4] = {1, 2, 3, 4}
```
위와 같은 배열이 있다고 하면 위 배열은 4byte만큼의 메모리를 연속적으로 저장한다. 변수 arr은 해당 배열의 시작 주소를 가지고 있고 index를 통해 $start_addr+4*index$원하는 배열의 원소에 접근할 수 있다.
![array](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*BakZvzVaB1CYRX7xAqRY5w.png)

### python list
파이선 리스트의 저장 구조는 C++과 다르다. 파이선 리스트 object에는 ob_item이라는 이중 포인터가 있고, ob_item은 리스트 원소들의 주소 값을 저장한 C언어의 배열을 가르킨다. 그 배열은 배열 원소들의 주소를 저장하고 있으며 ob_item에 저장된 포인터를 통해 실제 원소 값에 접근한다.
![list](/images/2024-02-21-faster_numpy_ds/py_list.png)

### 그래서 그거랑 성능이랑 무슨 연관이 있는 것인데?
C++ array를 보자. 규칙이 있다. 그것도 아주 간단한 규칙. 배열의 원소가 저장되어있는 메모리의 주소값이 정확히 4씩 증가한다.

python list는 그에 반해 규칙이 없다. ob_item이 저장하고 있는 주소를 보면 그냥 중구난방이다.

### 대충을 알겠는데.. 그런 규칙성이 정확히 어떤 이점이 있는건지 잘..
이때까지는 자료구조 이야기였다. C++ array의 자료구조와 python list의 자료구조를 비교해보았다.

이제 주제를 살짝 넘겨서, 컴퓨터구조 이야기를 시작해보자.

컴퓨터 메모리는 계층적으로 이루어져 있다. CPU(ALU)의 연산 속도에 비해 메모리는 턱없이 느리기 때문에 이를 그나마 완화하고자 가장 느리지만 용량이 큰 메모리, 그리고 상위 계층으로 갈수록 빠르지만 용량이 작은 메모리로 구성이 된다. 그림으로 표현하면 아래와 같다.
![list](/images/2024-02-21-faster_numpy_ds/memory_hierarchy.png)

SSD가 제아무리 빨라봐야 RAM 보다는 느리고 RAM이 제아무리 빨라봐야 Cache보다 느리다. 반대로, 캐시 메모리는 제아무리 커봐야 램보다는 너무 작다.

CPU가 사용하고자 하는 데이터가 Cache에 없으면 RAM까지 가야하고 RAM에서도 없으면 SSD까지 가게 된다.

### Cache 메모리에는 어떤 데이터를 저장하는데?
