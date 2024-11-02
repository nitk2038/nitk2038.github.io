---
layout: single
title:  "멀티 쓰레딩 환경에서 캐시 미스에 대해"
categories: ComputerArchitecture
tag: [computer_architecture, operating_system]
toc: true
toc_sticky: true
author_profile: true
---

# 멀티 쓰레딩 환경에서 캐시 미스에 대해
## CPU 캐시의 구조
이번 포스팅에 앞서, [numpy가 더 빠른 이유 - 캐시메모리 입장에서](https://meongju0o0.github.io/computerarchitecture/faster_numpy_ds/)를 먼저 보고 오길 바란다. 이번 포스팅도 CPU 캐시메모리와 관련된 이야기를 할 것이기 때문이다.

컴퓨터 저장장치는 여러 계층으로 구성되어있다. 느리지만 용량이 큰 저장장치, 적당한 속도와 적당한 용량의 저장장치, 빠르지만 용량이 아주 작은 저장장치로 구성되어있다.

느리지만 용량이 큰 저장장치는 HDD 혹은 SSD, 적당한 속도와 적당한 용량의 저장장치는 메인메모리(RAM), 빠른 속도와 작은 용량의 저장장치는 CPU 캐시메모리이다.

이 CPU 캐시메모리는 또 3가지 계층으로 구성되어 있다. L3, L2, L1.
이번에도 마찬가지로 오른쪽으로 갈 수록 속도가 빠르다.

## L1 캐시, L2 캐시, L3 캐시
그럼 이 L3, L2, L1을 결정짓는 특징적인 부분은 무엇일까? 우선 아래 그림을 보자.

<img src = "/images/2024-11-01-cache_miss_in_multithreading/cpu_architecture.png", width="100%">

### L1 캐시
L1 캐시는 코어 칩 내부에 위치하고 있고 명령어 캐시와 데이터 캐시로 나누어져 있다. **명령어 집합**과 **데이터 집합**은 다른 특성을 보이는 경향이 있다.

**명령어 집합**은 똑같은 명령어가 계속 반복해서 나타날 경향이 커 보통 시간 지역성이 높고 **데이터 집합**은 주로 공간 지역성이 높게 나타날 가능성이 크다.

이 둘을 나누어 관리하면 서로 다른 지역성을 활용할 수 있고 별도의 파이프라이닝을 구축해 명령어와 데이터를 동시에 읽을 수도 있다. 이러한 장점을 취해 L1 캐시는 명령어 집합과 데이터 집합을 분리해 관리해준다. 대신, 그만큼 활용하지 못하는 공간이 생길 수 있으니 캐시 메모리 용량 측면에서는 손해이다.

### L2 캐시
L2 캐시는 CPU에 따라 코어 내에 위치할 수도, 코어 밖에 위치할 수도 있다. L2 캐시를 코어 간에 공유자원으로 사용하는 경우도 있다.

일단은 L2 캐시도 코어 내에 위치한다고 가정하고 설명하자면, L1 캐시와의 유일한 차이점은 **명령어 영역**와 **데이터 영역**의 구분 없이 데이터(명령어 집합과 데이터 집합 모두)를 관리하는 것이다.
이러한 점으로 L1 캐시에 비해 불이익이 따르게 되는 것이다.

### L3 캐시
L3 캐시는 코어 밖에 위치해 코어 간에 서로 공유해서 사용하는 캐시 자원이다. 캐시 메모리 중 제일 느린 영역이다.

## 멀티 쓰레딩
일단 우리가 하려는 일은 배열 내 모든 원소들의 합을 구하는 것이다. 멀티 쓰레딩을 활용해서 연산 속도도 개선하려 한다.

어떻게 배열을 나누어 각 코어가 하는 일을 분배해야 할까? 두가지 선택지가 있을 것이다.
1. 크기가 100인 배열이 있고 코어의 개수는 2개라고 하면, 0~49번 idx의 배열과, 50~99번 idx 배열로 나누어 합 연산을 수행한다.
2. 마찬가지로, 크기가 100인 배열과 코어가 2개 있다고 하면, 짝수 idx를 0번 코어에서, 홀수 idx는 1번 코어에서 처리하게 하는 것이다.

이미 결론을 다 말한 것 같지만, **1번**이 더 유리할 것이다. L3 캐시에 올라가게 되는 데이터의 cache hit은 **2번**이 더 유리할 수 있지만, L1 캐시와 L2 캐시에 올라가는 데이터의 cache hit은 **1번**이 절대적으로 유리하다.

trade-off 관계가 존재하지만, 1번을 선택하는 것이 더 나은 선택이다. (사실 이런 점을 고려하지 않아도 굳이 2번 방식을 채택하는 경우를 본 적도 없다.)

## 얼마나 차이가 났을까?
크다면 큰 차이이고, 작다면 작은 차이지만 1.3배 정도의 차이로 **1번** 방식이 빨랐다. 실험 결과는 아래와 같았다.

- 실험 환경
    - Compiler: MinGW 11.0 w64
    - C11 Standard
    - 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz
        - 4 Core, 8 Logical Processor
        - L1 Cache Memory: 320KB
        - L2 Cache Memory: 5.0MB
        - L3 Cache Memory: 8.0MB
    - RAM: 16GB

![expr_result](/images/2024-11-01-cache_miss_in_multithreading/expr_result.png)

## Appendix (Source Code)
### Common Part
```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <pthread.h>

#define ARR_SIZE 1073741824
#define NUM_THREADS 8

typedef struct {
    const long long *nums;
    size_t step;
    size_t start_idx;
    size_t end_idx;
    long long sum;
} ThreadData;

void *parallel_sum(void *arg) {
    ThreadData *data = (ThreadData *)arg;
    data->sum = 0;
    for(size_t i = data->start_idx; i < data->end_idx; i += data->step) {
        data->sum += data->nums[i];
    }
    return NULL;
}
```

### Method 1
```c
int main() {
    srand(time(NULL));
    long long *nums = (long long *)malloc(ARR_SIZE * sizeof(long long));
    if(nums == NULL) {
        perror("malloc");
        return 1;
    }

    for(size_t i = 0; i < ARR_SIZE; i++) {
        nums[i] = rand() % 10;
    }

    const size_t chunk_size = ARR_SIZE / NUM_THREADS;
    pthread_t threads[NUM_THREADS];
    ThreadData thread_data[NUM_THREADS];

    const clock_t start = clock();
    for(int i = 0; i < NUM_THREADS; i++) {
        thread_data[i].nums = nums;
        thread_data[i].step = 1;
        thread_data[i].start_idx = i * chunk_size; // 쓰레드 개수를 통해 배열 슬라이싱
        thread_data[i].end_idx = (i == NUM_THREADS - 1) ? ARR_SIZE : (i + 1) * chunk_size;
        thread_data[i].sum = 0;

        if(pthread_create(&threads[i], NULL, parallel_sum, &thread_data[i])) {
            perror("pthread_create");
            exit(1);
        }
    }

    long long total_sum = 0;
    for(int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
        total_sum += thread_data[i].sum;
    }
    const clock_t end = clock();

    printf("TOTAL SUM AGGR RESULT: %lld\n", total_sum);
    printf("SUM AGGR EXECUTION TIME: %lf\n", (double)(end - start) / CLOCKS_PER_SEC);

    free(nums);
    pthread_exit(NULL);
    return 0;
}
```

### Method 2
```c
int main() {
    srand(time(NULL));
    long long *nums = (long long *)malloc(ARR_SIZE * sizeof(long long));
    if(nums == NULL) {
        perror("malloc");
        return 1;
    }

    for(size_t i = 0; i < ARR_SIZE; i++) {
        nums[i] = rand() % 10;
    }

    const size_t chunk_size = ARR_SIZE / NUM_THREADS;
    pthread_t threads[NUM_THREADS];
    ThreadData thread_data[NUM_THREADS];

    const clock_t start = clock();
    for(int i = 0; i < NUM_THREADS; i++) {
        thread_data[i].nums = nums;
        thread_data[i].step = NUM_THREADS; // 쓰레드 개수만큼 건너뛰며 합 연산
        thread_data[i].start_idx = i;
        thread_data[i].end_idx = ARR_SIZE;
        thread_data[i].sum = 0;

        if(pthread_create(&threads[i], NULL, parallel_sum, &thread_data[i])) {
            perror("pthread_create");
            exit(1);
        }
    }

    long long total_sum = 0;
    for(int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
        total_sum += thread_data[i].sum;
    }
    const clock_t end = clock();

    printf("TOTAL SUM AGGR RESULT: %lld\n", total_sum);
    printf("SUM AGGR EXECUTION TIME: %lf\n", (double)(end - start) / CLOCKS_PER_SEC);

    free(nums);
    pthread_exit(NULL);
    return 0;
}
```

### 참고 문헌
- DevLabs. (2024.08.13). "CPU 캐시란 무엇인가?" [https://zpub.tistory.com/536](https://zpub.tistory.com/536).
- Back to Basics. (2021.09.25). "[컴퓨터구조] 시스템 캐시란? (feat. L1, L2, L3)" [https://woozzang.tistory.com/155](https://woozzang.tistory.com/155)
- OpenAI. (2024). ChatGPT(Aug 8, 2024). GPT-4o. [https://chat.openai.com](https://chat.openai.com).
