import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import centerSeed from './seed/centerSeed';
import dummyUser, { adminUser } from './seed/userseed';

const request = supertest(app);
const centerApi = '/api/v1/centers';

describe('Tests for Centers endpoint', () => {
  describe('Test create center endpoint', () => {
    it('should fail to create a center if the user is not an admin', (done) => {
      request.post(`${centerApi}?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(centerSeed)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.be.an('object');
          expect(response.body.message)
            .to.equal('You need admin priviledges to access this resource');
          done();
        });
    });
    it('should fail to create a center if no name is provided', (done) => {
      const noName = { ...centerSeed };
      noName.name = '';
      request.post(`${centerApi}?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noName)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.name)
            .to.equal('Name is required for your center.');
          done();
        });
    });
    it(
      'should fail to create a center if no description is provided',
      (done) => {
        const noDescription = { ...centerSeed };
        noDescription.description = '';
        request.post(`${centerApi}?token=${adminUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(noDescription)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.description)
              .to.equal('Description is needed for your center');
            done();
          });
      }
    );
    it('should fail to create a center if no location is provided', (done) => {
      const noLocation = { ...centerSeed };
      noLocation.location = '';
      request.post(`${centerApi}?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noLocation)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.location)
            .to.equal('Pick a location for your center');
          done();
        });
    });
    it('should fail to create a center if no capacity is provided', (done) => {
      const noCapacity = { ...centerSeed };
      noCapacity.capacity = '';
      request.post(`${centerApi}?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noCapacity)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.capacity)
            .to.equal('Enter a capacity for your center.');
          done();
        });
    });
    it(
      'should fail to create a center if no equipments are supplied',
      (done) => {
        const noEquipments = { ...centerSeed };
        noEquipments.equipments = '';
        request.post(`${centerApi}?token=${adminUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(noEquipments)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.equipments)
              .to.equal('Your center needs a list of equipments');
            done();
          });
      }
    );
    it('should fail to create a center if no price is supplied', (done) => {
      const noPrice = { ...centerSeed };
      noPrice.price = '';
      request.post(`${centerApi}?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noPrice)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.price).to.equal('Your center needs a price-tag');
          done();
        });
    });
    it(
      'should fail to create a center if no availability is supplied',
      (done) => {
        const noAvailability = { ...centerSeed };
        noAvailability.availability = '';
        request.post(`${centerApi}?token=${adminUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(noAvailability)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.availability)
              .to.equal('Enter an availability option.');
            done();
          });
      }
    );
    it('should fail to create a center if no state is supplied', (done) => {
      const noState = { ...centerSeed };
      noState.state = '';
      request.post(`${centerApi}?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(noState)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.state)
            .to.equal('Choose a state');
          done();
        });
    });
    it(
      'should successfully create a center if all conditions are satisfied',
      (done) => {
        request.post(`${centerApi}?token=${adminUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(centerSeed)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object');
            expect(response.body.centerDetails).to.be.an('object');
            expect(response.body.centerDetails.image).to.be.a('string');
            expect(response.body.centerDetails.state).to.be.a('string');
            expect(response.body.centerDetails.description).to.be.a('string');
            expect(response.body.centerDetails.availability).to.be.a('string');
            expect(response.body.centerDetails.location).to.be.a('string');
            expect(response.body.centerDetails.price).to.be.a('number');
            expect(response.body.centerDetails.equipments).to.be.a('string');
            expect(response.body.centerDetails.name).to.be.a('string');
            done();
          });
      }
    );
  });
});
