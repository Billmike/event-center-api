import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import validateSignup from '../validators/validateSignup';

const User = db.User;

class Users {
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
      .then(existingUser => {
        if (existingUser) {
          return response.status(409).json({
            message: 'This email is already taken.'
          });
        }
        const hashedPassword = bcrypt.hashSync(request.body.password, 10);
        User.create({
          username: request.body.username,
          email: request.body.email,
          password: hashedPassword
        })
          .then(newUser => {
            const userToken = jwt.sign(
              {
                id: newUser.id,
                username: newUser.username
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
          .catch(error => {
            if (error.errors[0].message === 'username must be unique') {
              return response.status(409).json({
                message: 'This username is already taken'
              });
            }
          });
      })
      .catch(error => {
        return response.status(500).json({
          message:
            'Something went wrong! We are currently working on resolving this issue.'
        });
      });
  }
}

export default Users;
