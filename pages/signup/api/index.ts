import { signUpUrl } from "@/feature/auth/api";
import { instance } from "@/shared/api/client";
import { SignUpParams } from "@/shared/types/auth";

export const signUp = async (data: SignUpParams) => {
  try {
    const { status } = await instance.post(signUpUrl, data);
    return status;
  } catch (error) {
    throw error;
  }
};
