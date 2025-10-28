import { refreshUrl } from "@/feature/auth/api";
import { categoriesUrl } from "@/feature/board/api";
import { authInstance } from "@/shared/api/authClient";

export const getBoardCategories = async () => {
  try {
    const response = await authInstance.get(categoriesUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

export const newIssueAccessToken = async (refreshToken: string) => {
  try {
    const response = await authInstance.post(refreshUrl, refreshToken);
    return response;
  } catch (error) {
    throw error;
  }
};
