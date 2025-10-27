const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

const checkUserNameValidation = (username: string) => {
  return emailRegex.test(username);
};

const checkDisabledSignUpButton = () => {};

export { checkUserNameValidation };
