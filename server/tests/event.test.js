import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import eventSeed, { secondEvent } from './seed/eventSeed';
import dummyUser, { secondDummyUser } from './seed/userseed';

const request = supertest(app);
const eventApi = '/api/v1/events';

describe('Tests for Events API', () => {
  before((done) => {
    request.post('/api/v1/users/signup')
      .send(secondDummyUser)
      .end(() => {
        done();
      });
  });
  describe('Tests for events creation', () => {
    it('should fail to create an event if the user is not signed in', (done) => {
      request.post(eventApi)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(eventSeed)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
            .equal('Please sign into your account to access this resource.');
          done();
        });
    });
    it('should fail to create an event if no name is provided', (done) => {
      const noName = { ...eventSeed };
      noName.name = '';
      request.post(`/api/v1/events?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noName)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.name).to.equal('Your event needs a name');
          done();
        });
    });
    it('should fail to create an event if no date is supplied', (done) => {
      const noDate = { ...eventSeed };
      noDate.date = '';
      request.post(`/api/v1/events?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noDate)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(400);
          expect(response.body.date).to
            .equal('Please input a date for your event');
          done();
        });
    });
    it(
      'should fail to create an event if the center does not exist',
      (done) => {
        const testEvent = { ...eventSeed };
        testEvent.venue = 'Does not exist';
        request.post(`/api/v1/events?token=${dummyUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testEvent)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('No center found with this name.');
            done();
          });
      }
    );
    it('should handle a server error when one occurs', (done) => {
      request.post(`/api/v1/events?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(dummyUser)
        .end((error, response) => {
          expect(response.status).to.equal(500);
          done();
        });
    });
    it(
      'should create an event successfully if all values are supplied',
      (done) => {
        request.post(`/api/v1/events?token=${secondDummyUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(eventSeed)
          .end((error, response) => {
            expect(response.body).to.be.an('object');
            expect(response.body.message)
              .to.equal('Event created successfully.');
            expect(response.body.eventDetails).to.be.an('object');
            expect(response.body.eventDetails.name).to.be.a('string');
            expect(response.body.eventDetails.image).to.be.a('string');
            expect(response.body.eventDetails.venue).to.be.a('string');
            done();
          });
      }
    );
    it('should fail to create an event if the time slot is already taken', (done) => {
      request.post(`/api/v1/events?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(secondEvent)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          expect(response.body.message).to.equal(
            `Sorry, you cannot book an event at this
 time because there will be an event
 holding between 05:00:00 and 07:00:00.`
          );
          done();
        });
    });
  });
  describe('Get all events test', () => {
    it('should fetch all the events in the application', (done) => {
      request.get('/api/v1/events')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.eventDetails).to.be.an('array');
          done();
        });
    });
    it('should fetch the events for a single center', (done) => {
      request.get('/api/v1/center/events/1')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
  describe('Edit events test', () => {
    it('should fail to edit an event if a user is not signed in', (done) => {
      request.put(`/api/v1/event/${eventSeed.id}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(eventSeed)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
            .equal('Please sign into your account to access this resource.');
          done();
        });
    });
    it(
      'should fail to modify an event if the user did not create it',
      (done) => {
        request.put(`/api/v1/event/${eventSeed.id}?token=${dummyUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(eventSeed)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('You do not have the privilege to modify this resource');
            done();
          });
      }
    );
    it('should edit an event successfully', (done) => {
      const testEvent = { ...eventSeed };
      testEvent.startTime = '2018-04-19 13:00:00 +01:00';
      testEvent.endTime = '2018-04-19 15:00:00 +01:00';
      request.put(`/api/v1/event/4?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testEvent)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('Event modified successfully.');
          expect(response.body.eventDetails).to.be.an('object');
          done();
        });
    });
  });
  describe('Delete event test', () => {
    it('should throw an error if user is not logged in', (done) => {
      request.delete('/api/v1/event/eventSeed.id')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('should throw an error is no event is found', (done) => {
      request.delete(`/api/v1/event/100?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('No event found.');
          done();
        });
    });
    it('should delete an event', (done) => {
      request.delete(`/api/v1/event/4?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.eventDetails).to.be.an('object');
          done();
        });
    });
  });
});
