# 기능 요구 사항 정리

1. 회원가입 기능

- username, name, password, confirm password를 받는다.
- username은 이메일 형식으로 받는다 (ex: yunajoe@gmail.com)
- name은 사용자 닉네임으로, 1~10글자 사이로만 받는다. 공백은 허용되지 않는다.
- password는 8자 이상, 숫자, 영문자, 특수문자(!%\*#?&) 1개 이상의 조합만 허용이 된다.

2. 로그인 기능

- username와 password를 받는다.

3. 글 CRUD기능

- 글 등록, 조회(페이지네이션), 수정, 삭제 기능
- 로그인 이후에만 사용 가능하다.

# 예외 처리

1. 회원가입

- username, name, password, confirm password 4개중 하나라도 값이 없는 경우.
- password와 confirm password가 일치 하지 않는 경우
- username은 이메일 형식이 아닌 경우. 이메일 형식은 사용자명(로컬 부분), '@' 기호, 그리고 도메인으로 구성 (ex: yunajoe@gmail.com)
- username의 length가 1 ~ 10 외인 경우
- username에 공백이 포함된 경우

2. 로그인

- username 혹은 password 둘 중에 하나라도 값이 없는 경우
- username이 가입되어 있지 않은 경우
- username에 맞지 않은 password인 경우

# 사용 스택 & 라이브러리

- Next.js (App router) 16 ver.
- Zustand
- Zod
- axios
- luxon

# 실행방법

npm run dev
