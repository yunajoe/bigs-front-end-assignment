import { signUpUrl } from "@/feature/auth/api";
import instance from "@/shared/api/client";
import { SignUpParams } from "@/shared/types/auth";

export const signUp = async (data: SignUpParams) => {
  try {
    // 서버에서는 username 중복만 check한다.
    const response = await instance.post(signUpUrl, data);
    console.log("response", response);
  } catch (error) {
    console.error("error ===>>", error);
  }
};
