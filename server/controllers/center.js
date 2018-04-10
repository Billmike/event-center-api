import db from '../models';
import serverError from '../errorHandler/serverError';
import validateInput from '../validators/validateAddCenter';

const { Center } = db;

class CenterController {
  static createCenter(request, response) {

    const { errors, isValid } = validateInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    const {
      name, state, location,
      description, image, capacity, equipments, availability, price
    } = request.body;

    if (request.userDetails.username !== 'adminuser') {
      return response.status(401).json({
        message: 'You need admin priviledges to access this resource'
      });
    }
    return Center.create({
      name,
      state,
      image,
      description,
      location,
      capacity,
      equipments,
      availability,
      price,
      owner: request.userDetails.id
    }).then((center) => {
      return response.status(201).json({
        message: 'Center created successfully.',
        centerDetails: center
      });
    }).catch((error) => {
      return response.status(500).json({
        message: error.message
      });
    });
  }
}

export default CenterController;
