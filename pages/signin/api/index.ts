import { signInUrl } from "@/feature/auth/api";
import { instance } from "@/shared/api/client";
import { SignInParams } from "@/shared/types/auth";

export const signIn = async (data: SignInParams) => {
  try {
    const { status } = await instance.post(signInUrl, data);
    return status;
  } catch (error) {
    throw error;
  }
};
