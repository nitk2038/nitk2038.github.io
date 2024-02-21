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
numpy 이야기를 하기 전에, 파이선 이야기를 먼저 하고자 한다. [numpy 10배 더 빠르게 쓰기](https://meongju0o0.github.io/computerarchitecture/faster_numpy/)포스트의 내용을 살펴보면 numpy int32는 python list보다 34배 넘게 더 빠르다. SIMD만 고려해 생각해보면 속도차이가 없어야 할 것 같다.

~~*물론 파이선 3.11 기준으로 integer 자료형의 크기는 28바이트나 된다.* *더럽게 무거운 놈인 것은 확실하다.*~~

다시 제목으로 돌아가서, 왜 **너무 바쁜 파이선**이라는 제목을 붙였을까?

python list는 array가 아니다. 겉으로 생긴 것은 C++, JAVA, C# 배열과 비슷하지만, 작동 원리는 다르다.

## C++ array
