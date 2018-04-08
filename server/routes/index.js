import userController from '../controllers/user';

module.exports = (app) => {
  app.get('/api', (request, response) =>
    response.status(200).json({
      message: 'The base URL for the API'
    }));

  app.post('/api/v1/users/signup', userController.userSignup);
  app.post('/api/v1/users/signin', userController.userSignin);
};
