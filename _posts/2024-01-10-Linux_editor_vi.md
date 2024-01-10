---
layout: single
title:  "Linux Text Editor (vi)"
categories: Linux
tag: [Linux, GNU, Editor]
toc: true
toc_sticky: true
author_profile: true
---

# Linux Text Editor (vi)
- 리눅스 CLI 환경에서 사용할 수 있는 에디터 종류
    - vi
    - vim
    - nano

## vi(vim) text editor
- vi: visual editor의 줄임말
- vim: vi imporoved의 줄임말
- vi에 몇가지 기능을 추가한 것이 vim
- 리눅스 CLI에서 vi와 vim 사이의 차이는 없음
- 다수의 리눅스 환경에서 기본적으로 설치되어 있는 에디터
- 실행을 위해서는 아래 명령어로 접근

```bash
vi {파일명}
```

![enter-vi](/images/2024-04-10-Linux_Editor_vi/enter-vi.png)

### vi editor 사용 방법
- 기본적으로 vi editor에는 입력 모드와 명령 모드가 존재
- 명령 모드에서 입력 모드로는 'i', 'I' 등의 단축키를 통해 전환
- 입력 모드에서 명령 모드로는 ESC키로 전환

- 명령 모드 화면

![cmd-mode](/images/2024-04-10-Linux_Editor_vi/cmd-mode.png)

- 입력 모드 화면

![insert-mode](/images/2024-04-10-Linux_Editor_vi/insert-mode.png)

- 입력 모드에서는 왼쪽 하단에 '-- INSERT--'라는 텍스트가 존재
- 명령 모드에서 입력을 수행할 시에는 왼쪽 하단에 명령어 입력 가능

### vi 단축키
- 입력 모드 전환
    - **i: 커서 위치에 insert**
    - **I: 줄 맨 앞에서 insert**
    - a: 커서 다음에 insert
    - A: 줄 맨 뒤에서 insert

- 명령 모드 전환
    - **ESC: 입력 모드로 전환**

- 저장 단축키 (명령 모드에서 사용)
    - :w
        - 저장
    - :q
        - 닫기
    - :q!
        - 저장하지 않고 닫기
    - :wq
        - 저장하고 닫기
    - :숫자
        - 지정한 줄 번호로 이동

- 이동 단축키 (명령 모드에서 사용)
    - w: 단어 첫 글자 기준으로 다음으로 이동
    - W: 단어 첫 글자 기준으로 다음으로 이동
    - b: 단어 첫 글자 기준으로 이전으로 이동
    - B: 공백 기준으로 이전으로 이동
    - e: 단어 마지막 글자 기준으로 다음으로 이동
    - E: 공백 기준으로 다음(단어의 끝)으로 이동
    - gg: 문서 맨 앞으로 이동
    - G: 문서 맨 아래로 이동
    - ^: 문장 맨 앞으로 이동
    - $: 문장 맨 뒤로 이동

- 검색 단축키 (명령 모드에서 사용)
    - 명령 모드에서 '/' 입력 후에 검색하고 하는 텍스트를 입력
    - /+'찾고자 하는 텍스트'

- 검색 화면

![searching](/images/2024-04-10-Linux_Editor_vi/searching.png)

- 편집 단축키 (명령 모드에서 사용)
    - dd: 현재 줄 잘라내기
    - yy: 현재 줄 복사하기
    - p: 붙여넣기
    - u: 실행취소 (Undo)
    - ctrl+ r: 재실행 (Redo)
    - v: Visual 모드
    - y: 복사
    - c: 잘라내기

### 참고 문헌
- [https://blog.naver.com/PostView.nhn?blogId=ycpiglet&logNo=222367301056](https://blog.naver.com/PostView.nhn?blogId=ycpiglet&logNo=222367301056)
- [https://wayhome25.github.io/etc/2017/03/27/vi/](https://wayhome25.github.io/etc/2017/03/27/vi/)