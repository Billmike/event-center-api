import userController from '../controllers/user';
import centerController from '../controllers/center';
import sessionControl from '../middleware/SessionControl';

module.exports = (app) => {
  app.get('/api', (request, response) =>
    response.status(200).json({
      message: 'The base URL for the API'
    }));

  app.post('/api/v1/users/signup', userController.userSignup);
  app.post('/api/v1/users/signin', userController.userSignin);
  app.post(
    '/api/v1/centers', sessionControl.isLoggedIn,
    sessionControl.isUser, centerController.createCenter
  );
  app.put(
    '/api/v1/centers/:centerId', sessionControl.isLoggedIn,
    sessionControl.isUser, centerController.editCenter
  );
  app.delete(
    '/api/v1/center/:centerId', sessionControl.isLoggedIn,
    sessionControl.isUser, centerController.deleteCenter
  );
  app.get('/api/v1/centers', centerController.getCenters);
};
