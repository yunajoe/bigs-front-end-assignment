import { signUpUrl } from "@/feature/auth/api";
import { instance } from "@/shared/api/client";
import { SignUpParams } from "@/shared/types/auth";

export const signUp = async (data: SignUpParams) => {
  try {
    const response = await instance.post(signUpUrl, data);
    return response;
  } catch (error) {
    throw error;
  }
};
