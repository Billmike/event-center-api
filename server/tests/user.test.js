import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import dummyUser, { nonExistentUser, adminUser } from './seed/userseed';

const request = supertest(app);
const signupAPI = '/api/v1/users/signup';
const signinAPI = '/api/v1/users/signin';

describe('Integration tests for Authentication', () => {
  describe('Sign-up endpoint tests', () => {
    it('should fail to create user if no username is provided', (done) => {
      const testUser = { ...dummyUser };
      delete testUser.username;
      request.post(signupAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.username).to
            .equal('Enter a username greater than five characters.');
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should fail to create a user if no email is provided', (done) => {
      const testUser = { ...dummyUser };
      delete testUser.email;
      request.post(signupAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.email).to
            .equal('Please enter a valid email address.');
          expect(response.status).to.equal(400);
          done();
        });
    });
    it(
      `should fail to create a user if the
      email supplied is of incorrect format`,
      (done) => {
        const testUser = { ...dummyUser };
        testUser.email = 'qwertyuiop';
        request.post(signupAPI)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.email).to
              .equal('Please enter a valid email address.');
            expect(response.status).to.equal(400);
            done();
          });
      }
    );
    it('should fail to create a user if no password is supplied', (done) => {
      const testUser = { ...dummyUser };
      delete testUser.password;
      request.post(signupAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.password).to
            .equal('Your password should be at least 8 characters long.');
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should fail to create a user if the password length is less than or equal to seven', (done) => {
      const testUser = { ...dummyUser };
      testUser.password = 'qwert';
      request.post(signupAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.password).to
            .equal('Your password should be at least 8 characters long.');
          done();
        });
    });
    it(
      'should fail to sign up a user if the email is already registered',
      (done) => {
        const testUser = {
          username: 'randomuser',
          email: 'qwertyuiop@gmail.com',
          password: 'qwertyuiop',
          phoneNumber: '08012345678'
        };
        request.post(signupAPI)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((error, response) => {
            expect(response.status).to.equal(409);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('This email is already taken.');
            done();
          });
      }
    );
    it('should fail to sign up a user of the username already exists', (done) => {
      const testUser = {
        username: 'piedpiper',
        email: 'randomemail@gmail.com',
        password: 'qwertyuiop',
        phoneNumber: '08012345678'
      };
      request.post(signupAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          done();
        });
    });
    it(
      'should successfully create a user when all relevant data is supplied',
      (done) => {
        request.post(signupAPI)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(dummyUser)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            done();
          });
      }
    );
  });
  describe('Sign-in endpoint tests', () => {
    it(
      'should fail if a user tries to sign-in without providing a email',
      (done) => {
        const testUser = {
          email: dummyUser.email,
          password: dummyUser.password,
          phoneNumber: dummyUser.phoneNumber
        };
        delete testUser.email;
        request.post(signinAPI)
          .set('Connection', 'keeo alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.email).to
              .equal('Enter a valid email to sign-in.');
            done();
          });
      }
    );
    it(
      'should fail if a user tries to sign-in without providing a password',
      (done) => {
        const testUser = {
          email: dummyUser.email,
          password: dummyUser.password,
          phoneNumber: dummyUser.phoneNumber
        };
        delete testUser.password;
        request.post(signinAPI)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      }
    );
    it(
      'should fail if the user provides a wrong password for an email that exists',
      (done) => {
        const testUser = {
          email: dummyUser.email,
          password: dummyUser.password,
          phoneNumber: dummyUser.phoneNumber
        };
        testUser.password = 'zxcvbnmasdf';
        request.post(signinAPI)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message)
              .to.equal('Invalid email or password.');
            done();
          });
      }
    );
    it('should fail if the email is unregistered', (done) => {
      const testUser = { email: 'asdfg@gmail.com', password: 'qwertyuiop' };
      request.post(signinAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should sign-in a user that is already signed up', (done) => {
      const testUser = { email: dummyUser.email, password: dummyUser.password };
      request.post(signinAPI)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Signin successful.');
          expect(response.body.email).to.equal('davyjones@gmail.com');
          expect(response.body.username).to.equal('davyjones');
          expect(response.body.token).to.be.a('string');
          done();
        });
    });
  });
  describe('Get user events test', () => {
    it('should return an empty array of a user has no events', (done) => {
      request.get(`/api/v1/user/events?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('should return the events of a user', (done) => {
      request.get(`/api/v1/user/events?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to
            .equal('You currently have 3 event(s).');
          done();
        });
    });
  });
  describe('User profile test', () => {
    it('should return an error if the user is not found', (done) => {
      request.put(`/api/v1/user/profile?token=${nonExistentUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(nonExistentUser)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should fail to update a user\'s password if they provide an incorrect current password', (done) => {
      const testUser = { currentPassword: 'somethingelse', newPassword: 'newPasswordMan' };
      request.put(`/api/v1/user/profile?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Incorrect password.');
          done();
        });
    });
    it(
      'should return an error if the user to be edited is not found',
      (done) => {
        request.put(`/api/v1/user/edit?token=${nonExistentUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(nonExistentUser)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            done();
          });
      }
    );
    it('should modify the details of a signed in user', (done) => {
      const testUser = { ...dummyUser };
      testUser.phoneNumber = '09089898989';
      request.put(`/api/v1/user/edit?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
    it('should update the password of a signed in user', (done) => {
      const testUser = {
        currentPassword: dummyUser.password,
        newPassword: 'newPasswordhere'
      };
      request.put(`/api/v1/user/profile?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.message).to
            .equal('Password updated successfully.');
          done();
        });
    });
  });
});
