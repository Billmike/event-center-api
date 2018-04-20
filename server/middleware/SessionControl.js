import jwt from 'jsonwebtoken';
import db from '../models';
import serverError from '../errorHandler/serverError';

const { User } = db;

/**
 * Controls the user session
 */
class SessionControl {
  /**
   * Checks if a user is logged in
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @param {function} next - Callback function
   */
  static isLoggedIn(request, response, next) {
    request.token = request.headers['x-access-token']
    || request.query.token || request.headers.token;
    if (!request.token) {
      return response.status(401).json({
        message: 'Please sign into your account to access this resource.'
      });
    }
    next();
  }

  /**
   * Verifies the identity of a user
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   * @param {function} next - Callback function
   *
   */
  static isUser(request, response, next) {
    let verifyToken;
    request.userDetails = {};
    try {
      verifyToken = jwt.verify(request.token, process.env.SECRET);
    } catch (error) {
      response.status(400).json({
        message: 'Unable to verify user.'
      });
    }
    User.findById(verifyToken.id)
      .then((user) => {
        if (!user) {
          response.status(400).json({
            message: 'Unable to verify user.'
          });
          return next();
        }
        request.userDetails = verifyToken;
        return next();
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }
}

export default SessionControl;
