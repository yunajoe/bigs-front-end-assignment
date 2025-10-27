import axios from "axios";

const instance = axios.create({
  baseURL: "https://front-mission.bigs.or.kr/",
  timeout: 1000,
});

console.log("instance", instance);

// https://front-mission.bigs.or.kr/auth/signup (post)
// https://front-mission.bigs.or.kr/auth/signin (post)
// https://front-mission.bigs.or.kr/auth/refresh (post)
// https://front-mission.bigs.or.kr/boards (post) 글등록
// https://front-mission.bigs.or.kr/boards/4 (patch) 글수정
// https://front-mission.bigs.or.kr/boards/100 (get) 글 조회
// https://front-mission.bigs.or.kr/boards/4 (delete) 글 삭제
// https://front-mission.bigs.or.kr/boards?page=0&size=10 (get) 글 목록 조회
// https://front-mission.bigs.or.kr/boards/categories (get) 게시판 카테고리
