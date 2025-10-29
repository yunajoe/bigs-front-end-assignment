export type CustomError = {
  status?: number;
  message?: string;
  data?: { username?: string; message?: string };
};

export const customError = (type: string, error: CustomError) => {
  if (type === "RESPONSE_ERROR") {
    if (error?.data?.username) {
      return {
        status: error.status,
        message: error.data.username,
      };
    }
    return {
      status: error.status,
      message: error?.data?.message || error.message,
    };
  }

  return {
    status: error.status,
    message: error.message,
  };
};
