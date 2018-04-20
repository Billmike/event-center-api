import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import dummyUser from './seed/userseed';

const request = supertest(app);

describe('Integration tests for Ratings functionality', () => {
  it('should create a rating for a center', (done) => {
    request.post(`/api/v1/center/rating/1?token=${dummyUser.token}`)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(4)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
  });
  it(
    'should update the ratings of a user who has rated the same center previously',
    (done) => {
      request.post(`/api/v1/center/rating/1?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(3.5)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    }
  );
  it('should fail if the center is not found', (done) => {
    request.post(`/api/v1/center/rating/100?token=${dummyUser.token}`)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(3)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
  });
});
