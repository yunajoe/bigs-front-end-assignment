export type CustomError = {
  status?: number;
  message?: string;
  data?: { username?: string; message?: string };
};

export const customError = (type: string, error: CustomError) => {
  switch (type) {
    case "RESPONSE_ERROR": {
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
    case "NO_RESPONSE": {
      return {
        status: error.status,
        message: error.message,
      };
    }
    case "UNKNOWN_ERROR": {
      return {
        status: error.status,
        message: error.message,
      };
    }
    default: {
      return {
        status: error.status,
        message: error.message,
      };
    }
  }
};
