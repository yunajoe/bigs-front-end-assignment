import { useAuthStore } from "@/feature/auth/auth-store";
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
    // accessToken이 없으면은??? 로그인 페이졸 보내자

    const { accessToken } = useAuthStore.getState();
    console.log("나는야 accessToken", accessToken);
    if (!accessToken) {
      window.location.href = "/signin";
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
authInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  //  dashboard api와 같은 인증이 필요한 api를 콜하였을 때 에러가 난 경우
  // accessToken이 문제인 경우
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    console.log("error", error);
    return Promise.reject(error);
  }
);
