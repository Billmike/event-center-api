import Sequelize from 'sequelize';
import db from '../models';
import serverError from '../errorHandler/serverError';
import validateInput from '../validators/validateAddCenter';

const { Center } = db;
const { Op } = Sequelize;

/**
 * A controller class for handling center actions
 */
class CenterController {
  /**
   * Create a new center
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The center object
   */
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
      if (error.errors[0].message === 'name must be unique') {
        return response.status(409).json({
          message: 'A center with this name already exists.'
        });
      }
      return response.status(500).json({
        message: error.message
      });
    });
  }

  /**
   * Edit a center in the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The center object
   */
  static editCenter(request, response) {
    return Center.findById(request.params.centerId)
      .then((center) => {
        if (!center) {
          return response.status(404).json({
            message: 'Center not found.'
          });
        } else if (request.userDetails.username !== 'adminuser') {
          return response.status(401).json({
            message: 'You need admin priviledges to access this resource'
          });
        }
        return center.update({
          name: request.body.name || center.name,
          description: request.body.description || center.description,
          image: request.body.image || center.image,
          state: request.body.state || center.state,
          location: request.body.location || center.location,
          capacity: request.body.capacity || center.capacity,
          equipments: request.body.equipments || center.equipments,
          availability: request.body.availability || center.availability,
          price: request.body.price || center.price
        }).then(() => {
          return response.status(201).json({
            message: 'Center details updated successfully',
            centerDetails: center
          });
        });
      }).catch((error) => {
        return response.status(500).json({
          message: serverError
        });
      });
  }

  /**
   * Delete a center
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The center object
   */
  static deleteCenter(request, response) {
    const { username } = request.userDetails;
    Center.findById(request.params.centerId)
      .then((center) => {
        if (!center) {
          return response.status(404).json({
            message: 'Center not found.'
          });
        }
        if (username !== 'adminuser') {
          return response.status(401).json({
            message: 'You need admin priviledges to access this resource'
          });
        }
        return center.destroy().then(() => {
          response.status(200).json({
            message: 'Center deleted successfully',
            deletedCenter: center
          });
        });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }

  /**
   * Fetch all centers
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The center object
   */
  static getCenters(request, response) {
    Center.all()
      .then((centers) => {
        return response.status(200).json({
          message: 'Centers fetched successfully.',
          centerData: centers
        });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }

  /**
   * Search through the centers
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The center object
   */
  static searchCenters(request, response) {
    const { search } = request.query;
    return Center.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${search}`
          },
          location: {
            [Op.iLike]: `%${search}`
          }
        }
      }
    }).then((foundCenters) => {
      if (foundCenters.length == 0) {
        return response.status(200).json({
          message: 'No center found with this name or location'
        });
      }
      return response.status(200).json({
        message: `Found ${foundCenters.length} center(s) matching ${search}.`,
        centerDetails: foundCenters
      });
    }).catch(() => {
      return response.status(500).json({
        message: serverError
      });
    });
  }

  /**
   * Fetch one center from the database
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The center object
   */
  static getOneCenter(request, response) {
    Center.findById(request.params.centerId)
      .then((foundCenter) => {
        if (!foundCenter) {
          return response.status(404).json({
            message: 'No center found.'
          });
        }
        return response.status(200).json({
          message: 'Center found',
          centerDetail: foundCenter
        });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }
}

export default CenterController;
