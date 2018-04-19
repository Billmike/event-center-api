import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import validateSignup from '../validators/validateSignup';
import validateSignin from '../validators/validateSignin';

const { User } = db;

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
          message:
            'Something went wrong! We are currently working on resolving this issue.'
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
        message: 'Something went wrong! We are currently working on resolving this issue.'
      });
    });
  }
}

export default Users;
