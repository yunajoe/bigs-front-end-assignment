import axios from "axios";

const instance = axios.create({
  baseURL: "https://front-mission.bigs.or.kr/",
});

export default instance;
