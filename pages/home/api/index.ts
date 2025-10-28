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
