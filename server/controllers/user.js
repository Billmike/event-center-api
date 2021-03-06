import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import validateSignup from '../validators/validateSignup';
import validateSignin from '../validators/validateSignin';
import serverError from '../errorHandler/serverError';

const { User, Center, Event } = db;

/**
 * Controller class for handling user actions
 */
class Users {
  /**
   * Create a new User
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The user object
   */
  static userSignup(request, response) {
    const { errors, isValid } = validateSignup(request.body);
    if (!isValid) {
      return response.status(400).json(errors);
    }
    User.findOne({
      where: {
        email: request.body.email
      }
    })
      .then((existingUser) => {
        if (existingUser) {
          return response.status(409).json({
            message: 'This email is already taken.'
          });
        }
        const hashedPassword = bcrypt.hashSync(request.body.password, 10);
        User.create({
          username: request.body.username,
          email: request.body.email,
          password: hashedPassword,
          phoneNumber: request.body.phoneNumber
        })
          .then((newUser) => {
            const userToken = jwt.sign(
              {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
              },
              process.env.SECRET,
              { expiresIn: '10h' }
            );
            response.status(201).json({
              message: 'Account created successfully!',
              username: newUser.username,
              email: newUser.email,
              token: userToken
            });
          })
          .catch((error) => {
            console.log(error);
            if (error.errors[0].message === 'username must be unique') {
              return response.status(409).json({
                message: 'This username is already taken'
              });
            }
          });
      })
      .catch((error) => {
        return response.status(500).json({
          message: serverError
        });
      });
  }

  /**
   * Sign-in a user
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The user object
   */
  static userSignin(request, response) {
    const { errors, isValid } = validateSignin(request.body);
    if (!isValid) {
      return response.status(400).json(errors);
    }
    const { email, password } = request.body;
    User.findOne({
      where: { email }
    }).then((user) => {
      if (!user) {
        return response.status(400).json({
          message: 'Invalid email or password.'
        });
      }
      const unhashedPassword = bcrypt.compareSync(password, user.password);
      if (!unhashedPassword) {
        return response.status(400).json({
          message: 'Invalid email or password.'
        });
      }
      const userToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email
        },
        process.env.SECRET,
        { expiresIn: '10h' }
      );
      response.status(201).json({
        message: 'Signin successful.',
        email: user.email,
        username: user.username,
        token: userToken
      });
    }).catch(() => {
      return response.status(500).json({
        message: serverError
      });
    });
  }

  /**
   * Update a user password
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The user object
   */
  static editPassword(request, response) {
    User.findById(request.userDetails.id)
      .then((userDetail) => {
        if (!userDetail) {
          return response.status(400).json({
            message: 'User not found'
          });
        }
        const unhashedPassword = bcrypt
          .compareSync(request.body.currentPassword, userDetail.password);

        if (!unhashedPassword) {
          return response.status(400).json({
            message: 'Incorrect password.'
          });
        }
        const hashedUpdatedPassword = bcrypt
          .hashSync(request.body.newPassword, 10);
        return userDetail.update({
          password: hashedUpdatedPassword
        }).then((updatedUser) => {
          return response.status(201).json({
            message: 'Password updated successfully.',
          });
        });
      }).catch(() => {
        return response.status(500).json({
          error: serverError
        });
      });
  }

  /**
   * Get user events
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The user events
   */
  static getUserEvents(request, response) {
    Event.findAll({
      where: {
        organizer: request.userDetails.id
      }
    }).then((userEvents) => {
      if (userEvents.length == 0) {
        return response.status(200).json({
          message: 'You currently have no events created.'
        });
      }
      return response.status(200).json({
        message: `You currently have ${userEvents.length} event(s).`,
        eventDetails: userEvents
      });
    }).catch(() => {
      return response.status(500).json({
        message: serverError
      });
    });
  }

  /**
   * Modify user details
   *
   * @param {object} request - The request object
   * @param {object} response - The response object
   *
   * @returns {object} The user object
   */
  static modifyUserDetails(request, response) {
    User.findById(request.userDetails.id)
      .then((userDetail) => {
        if (!userDetail) {
          return response.status(400).json({
            message: 'User not found.'
          });
        }
        return userDetail.update({
          username: request.body.username || userDetail.username,
          email: request.body.email || userDetail.email,
          phoneNumber: request.body.phoneNumber || userDetail.phoneNumber
        }).then((updatedProfile) => {
          return response.status(201).json({
            message: 'Profile updated successfully',
            userDetails: {
              username: updatedProfile.username,
              email: updatedProfile.email,
              phoneNumber: updatedProfile.phoneNumber
            }
          });
        });
      }).catch(() => {
        return response.status(500).json({
          message: serverError
        });
      });
  }
}

export default Users;
