import { isEmpty } from 'lodash';

const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateSignin = (userData) => {
  const errors = {};
  if (
    (userData.email === undefined ||
      userData.email.trim() === '' ||
      !validateEmail.test(userData.email)) &&
    (userData.password === undefined || userData.password.trim() === '')
  ) {
    errors.requiredFields = 'All fields are required.';
  }
  if (
    userData.email === undefined ||
    userData.email.trim() === '' ||
    !validateEmail.test(userData.email)
  ) {
    errors.email = 'Enter a valid email to sign-in.';
  }
  if (userData.password === undefined || userData.password.trim() === '') {
    errors.password = 'Enter your password.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateSignin;
