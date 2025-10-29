import { useAuthStore } from "@/feature/auth/auth-store";
import axios from "axios";

export const authInstance = axios.create({
  baseURL: "https://front-mission.bigs.or.kr/",
  timeout: 3000,
});

const newIssueAccessToken = async (refreshToken: string) => {
  try {
    // TODO: baseURL 상수화시키기
    const response = await axios.post(
      "https://front-mission.bigs.or.kr/auth/refresh",
      { refreshToken }
    );
    return response;
  } catch (error) {
    console.log("refreshError입니당 ==>", error);
    throw error;
  }
};

// 요청 인터셉터 추가하기
authInstance.interceptors.request.use(
  function (config) {
    const { accessToken } = useAuthStore.getState();
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
  async function (error) {
    const originalConfig = error.config;

    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();
    if (
      error.response?.status >= 400 &&
      refreshToken &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;
      try {
        const response = await newIssueAccessToken(refreshToken);
        // 새로운 토큰이 잘 발행이 되었다면은
        if (response.status === 200) {
          setTokens(response.data.accessToken, response.data.refreshToken);
          originalConfig.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return authInstance(originalConfig);
        }
      } catch (error: any) {
        alert("로그인 유효시간이 끝났습니다. 다시 로그인해주세요");
        clearTokens();
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);
