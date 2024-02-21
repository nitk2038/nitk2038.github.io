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
![list](https://seoyeonhwng.medium.com/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EB%82%B4%EB%B6%80-%EA%B5%AC%EC%A1%B0-f04847b58286)

### 그래서 그거랑 성능이랑 무슨 연관이 있는 것인데?
C++ array를 보자. 규칙이 있다. 너무 쉽다. 배열의 원소가 저장되어있는 메모리의 주소값이 정확히 4씩 증가한다.

python list는?
