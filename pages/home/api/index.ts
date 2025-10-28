import { categoriesUrl } from "@/feature/board/api";
import { authInstance } from "@/shared/api/authClient";

export const getBoardCategories = async () => {
  try {
    const { status } = await authInstance.get(categoriesUrl);
    return status;
  } catch (error) {
    throw error;
  }
};
