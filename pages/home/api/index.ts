import { categoriesUrl, writePostUrl } from "@/feature/board/api";
import { authInstance } from "@/shared/api/authClient";
import { WritePostParams } from "@/shared/types/board";

export const getBoardCategories = async () => {
  try {
    const response = await authInstance.get(categoriesUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

export const writePost = async (data: WritePostParams) => {
  try {
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        title: data.title,
        content: data.content,
        category: data.category,
      })
    );
    if (data.file) {
      formData.append("file", data.file);
    }
    const response = await authInstance.post(writePostUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
