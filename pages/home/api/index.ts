import { boardUrl, categoriesUrl } from "@/feature/board/api";
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

export const getPosts = async (page = 0, size = 10) => {
  try {
    const response = await authInstance.get(boardUrl, {
      params: { page, size },
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const writePost = async (data: WritePostParams) => {
  try {
    const formData = new FormData();

    const blob = new Blob(
      [
        JSON.stringify({
          title: data.title,
          content: data.content,
          category: data.category,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("request", blob);

    if (data.file) {
      formData.append("file", data.file);
    }

    const response = await authInstance.post(boardUrl, formData);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};
