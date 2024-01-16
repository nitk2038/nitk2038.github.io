---
layout: single
title:  "Ubuntu에 Docker 설치"
categories: OpenSource
tag: [linux, editor, tool, tip]
toc: true
toc_sticky: true
author_profile: true
---

# Ubuntu에 Docker 설치

<p>갑자기 너무 뜬금 없는 이야기일 수도 있다. 우분투에 도커 설치라니? "sudo apt-get install docker" 명령어 한 줄이면 되는 것 아닌가? 라고 생각하고 호기롭게 입력했으나. 되지 않았다.</p>
<p>그냥 생각보다 과정이 복잡했고, 본 게시물을 통해 데비안 패키지 매니저에 대해 좀 더 알게 될 기회라 생각해 작성하게 되었다.</p>

## Ubuntu에 Docker 설치 무작정 따라하기
**1. sudo apt-get update**

![img](/images/2024-01-16-Docker_on_Ubuntu/apt-update.png)

**2. sudo apt-get upgrade**

![img](/images/2024-01-16-Docker_on_Ubuntu/apt-upgrade.png)

**3. sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common**
![img](/images/2024-01-16-Docker_on_Ubuntu/apt-install-pre.png)

**4. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -**

![img](/images/2024-01-16-Docker_on_Ubuntu/apt-key-add.png)

**5. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"**

![img](/images/2024-01-16-Docker_on_Ubuntu/apt-add-repo.png)

**6. sudo apt-get install docker-ce docker-ce-cli containerd.io**

![img](/images/2024-01-16-Docker_on_Ubuntu/apt-install-docker.png)

**7. sudo systemctl status docker**

![img](/images/2024-01-16-Docker_on_Ubuntu/systemctl-status-docker.png)

**8. sudo docker run hello-world**

![img](/images/2024-01-16-Docker_on_Ubuntu/docker-run.png)

## debian apt에 대해서
- **APT**: **AP**ar**T**ment는 농담이고
- **APT**: **A**dvanced **P**ackaging **T**ool
- 데비안 계열 리눅스 패키지 관리 매니저
- 참고로 페도라 계열의 경우 yum, rpm을 사용

### 참고문헌
- Haengsin. (2024). "Ubuntu에 Docker 설치" [https://haengsin.tistory.com/128](https://haengsin.tistory.com/128)
- Wikipedia. (2024). "APT (software)" [https://en.wikipedia.org/wiki/APT_(software)](https://en.wikipedia.org/wiki/APT_(software))