import { isEmpty } from 'lodash';
import { isValidNumber } from 'libphonenumber-js';

const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateSignup = (userData) => {
  const errors = {};
  if (
    userData.username === undefined ||
    userData.username.trim() === '' ||
    userData.username.length <= 5
  ) {
    errors.username = 'Enter a username greater than five characters.';
  }
  if (
    userData.email === undefined ||
    userData.email.trim() === '' ||
    !validateEmail.test(userData.email)
  ) {
    errors.email = 'Please enter a valid email address.';
  }
  if (
    userData.password === undefined ||
    userData.password.trim() === '' ||
    userData.password.length <= 7
  ) {
    errors.password = 'Your password should be at least 8 characters long.';
  }
  if (userData.phoneNumber === undefined ||
    userData.phoneNumber.trim() === '' ||
    isValidNumber({ phone: userData.phoneNumber, country: 'NG' }) !== true
  ) {
    errors.phoneNumber = 'Please input a valid phone-number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateSignup;
