import { isEmpty } from 'lodash';

/**
 * Validates the incoming request
 *
 * @param {Object} centerData - The incoming request
 * data for the creation of a center
 */
const validateAddCenter = (centerData) => {
  const errors = {};
  if (centerData.name === undefined || centerData.name.trim() === '') {
    errors.name = 'Name is required for your center.';
  }
  if (centerData.location === undefined || centerData.location.trim() === '') {
    errors.location = 'Pick a location for your center';
  }
  if (centerData.state === undefined || centerData.state.trim() === '') {
    errors.state = 'Choose a state';
  }
  if (centerData.description === undefined
    || centerData.description.trim() === '') {
    errors.description = 'Description is needed for your center';
  }
  if (centerData.capacity === undefined || centerData.capacity.trim() === '') {
    errors.capacity = 'Enter a capacity for your center.';
  }
  if (centerData.equipments === undefined
    || centerData.equipments.trim() === '') {
    errors.equipments = 'Your center needs a list of equipments';
  }
  if (centerData.price === undefined || centerData.price.trim() === '') {
    errors.price = 'Your center needs a price-tag';
  }
  if (centerData.availability === undefined
    || centerData.availability.trim() === '') {
    errors.availability = 'Enter an availability option.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateAddCenter;
