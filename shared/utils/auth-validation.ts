const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
const nameRegex = /\s/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;

const checkUserNameValidation = (username: string) => {
  return emailRegex.test(username);
};
const checkNameValidation = (name: string) => {
  return !nameRegex.test(name) && name.length >= 1 && name.length <= 10;
};
const checkPasswordValidation = (password: string) => {
  return passwordRegex.test(password);
};

const checkConfirmationPasswordValidation = (
  password: string,
  conFirmationPassword: string
) => {
  return password === conFirmationPassword;
};

export {
  checkConfirmationPasswordValidation,
  checkNameValidation,
  checkPasswordValidation,
  checkUserNameValidation,
};
