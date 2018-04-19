import { isEmpty } from 'lodash';

const validateAddEvent = (eventData) => {
  const errors = {};
  if (eventData.name.trim() === '' || eventData.name === undefined) {
    errors.name = 'Your event needs a name';
  }
  if (eventData.date.trim() === '' || eventData.date === undefined) {
    errors.date = 'Please input a date for your event';
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
};

export default validateAddEvent;
