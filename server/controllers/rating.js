import db from '../models';
import serverError from '../errorHandler/serverError';

const { Center, Rating } = db;

/**
 * Controller for handling ratings
 */
class Ratings {
  /**
   * Rate a center
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns The rated center
   */
  static rateCenter(request, response) {
    Center.findById(request.params.centerId)
      .then((foundCenter) => {
        if (!foundCenter) {
          return response.status(400).json({
            message: 'No center found.'
          });
        }
        return Rating.findAll({
          where: {
            centerId: request.params.centerId
          }
        }).then((ratedCenter) => {
          if (ratedCenter.length == 0) {
            return Rating.create({
              rating: request.body.rating,
              userId: request.userDetails.id,
              centerId: request.params.centerId
            }).then((centerRated) => {
              return response.status(201).json({
                message: 'Successfully rated this center.',
                centerDetails: {
                  centerRated
                }
              });
            });
          }
          const usersArray = [];
          ratedCenter.forEach(center => usersArray
            .push(center.dataValues.userId));
          if (usersArray.includes(request.userDetails.id)) {
            return Rating.findOne({
              where: {
                userId: request.userDetails.id
              }
            }).then(updateCenterRating => updateCenterRating
              .update({ rating: request.body.rating }))
              .then((ratingUpdated) => {
                return response.status(201).json({
                  message: 'Your rating has been updated.',
                  centerDetails: {
                    ratingUpdated
                  }
                });
              });
          }
          return Rating.create({
            rating: request.body.rating,
            userId: request.userDetails.id,
            centerId: request.params.centerId
          }).then((ratedCenter) => {
            return response.status(201).json({
              message: '>>>>><<<< Successfully',
              centerDetails: {
                ratedCenter
              }
            });
          });
        });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }
}

export default Ratings;
