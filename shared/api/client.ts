import axios from "axios";
import { AXIOS_ERROR_MESSAGE } from "../const/axios-validation";

export const instance = axios.create({
  baseURL: "https://front-mission.bigs.or.kr/",
});

// 요청 인터셉터 추가하기
instance.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행

    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      // 요청이 전송되었고, 서버는 2xx 외의 상태 코드(4xx, 5xx) 응답했습니다.
      const { status, data } = error.response;
      return Promise.reject({
        type: "RESPONSE_ERROR",
        message: AXIOS_ERROR_MESSAGE.RESPONSE_ERROR,
        status,
        data,
      });
    } else if (error.request && !error.response) {
      // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
      return Promise.reject({
        type: "NO_RESPONSE",
        message: AXIOS_ERROR_MESSAGE.NO_RESPONSE,
        status: 500,
      });
    }

    // 알수없는 오류
    return Promise.reject({
      type: "UNKNOWN_ERROR",
      message: AXIOS_ERROR_MESSAGE.UNKNOWN_ERROR,
      status: 500,
    });
  }
);
