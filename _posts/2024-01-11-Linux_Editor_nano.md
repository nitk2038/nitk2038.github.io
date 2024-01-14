---
layout: single
title:  "Linux Text Editor (nano)"
categories: DevelpmentTool
tag: [linux, editor, tool, tip]
toc: true
toc_sticky: true
author_profile: true
---

# Linux Text Editor (nano)
- 리눅스 CLI 환경에서 사용할 수 있는 에디터 종류
    - vi
    - vim
    - nano

## nano text editor
- GNU(**G**NU is **N**ot **U**nix)재단에서 제작
- 원래 GNU OS 기본 텍스트 에디터로 사용
- 후에 대다수 리눅스 배포판(Ubuntu, CentOS, RHEL, ...)에서도 기본 텍스트 에디터로 사용됨
- 마찬가지로 Unix 배포판(MacOS)에서도 기본 에디터로 지원
- 저자는 리눅스 CLI 환경에서 텍스트 에디터로 nano를 추천함
- 개인적으로 vi는 단축키도 지나치게 많고 익숙하지 않으면 손가락이 꼬임

```bash
nano {파일명}
```

![enter-nano](/images/2024-01-11-Linux_Editor_nano/enter-nano.png)

### nano editor 사용 방법
- nano editor는 바로 입력 모드로 진입
- 명령 모드가 따로 존재하지 않음

- 실행 시 화면

![cmd-mode](/images/2024-01-11-Linux_Editor_nano/nano-screen.png)

### nano 단축키
- 저장 단축키
    - **ctrl + o: 저장**
    - **ctrl + x: 닫기**

- 이동 단축키
    - **home: 현재 줄의 맨 앞으로 커서를 이동**
    - **end: 현재 줄의 맨 뒤로 커서를 이동**
    - **pgup: 현재 페이지의 전 페이지로 이동**
    - **pgdn: 현재 페이지의 뒷 페이지로 이동**
    - ctrl + /: 원하는 줄 위치로 이동

- 입력 단축키
    - **ctrl + k: 현재 커서의 전체 줄 삭제**
    - ctrl + \\: 원하는 단어 찾은 후 변경하고자 하는 단어로 변경 
    - ctrl + u: 직전에 삭제한 줄(ctrl + k로 삭제한 줄, 버퍼에 담김) 붙여넣기

- 검색 단축키
    - **ctrl + w: 원하는 단어 찾기**

### 참고 문헌
- [https://blog.naver.com/PostView.nhn?blogId=ycpiglet&logNo=222367301056](https://blog.naver.com/PostView.nhn?blogId=ycpiglet&logNo=222367301056)
- [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=audiendo&logNo=220784763013](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=audiendo&logNo=220784763013)
