import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import eventSeed from './seed/eventSeed';
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
    it('should fail to create an event if no duration is supplied', (done) => {
      const noDuration = { ...eventSeed };
      noDuration.duration = '';
      request.post(`/api/v1/events?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noDuration)
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.duration).to
            .equal('Please enter a duration for your event');
          expect(response.status).to.equal(400);
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
    it('should edit an event successfully', (done) => {
      request.put(`/api/v1/event/${eventSeed.id}?token=${secondDummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(eventSeed)
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
});
