import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://front-mission.bigs.or.kr/",
  timeout: 1000,
});

// 요청 인터셉터 추가하기
authInstance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    // headers의 AUthroziaion dㅔ Bearer TOken에 accessToken이 있는지 확인하기
    // accessToken이 있으면은  headers에 acccessToken를 넎는다.

    // accessToken이 없으면은???
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
authInstance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
