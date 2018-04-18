import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';
import centerSeed from './seed/centerSeed';
import dummyUser, { adminUser } from './seed/userseed';

const request = supertest(app);
const centerApi = '/api/v1/centers';
const deleteCenter = '/api/v1/center';

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
  describe('Edit center endpoint', () => {
    it('should throw an error if the user is not an admin', (done) => {
      request.put(`${centerApi}/${centerSeed.id}?token=${dummyUser.token}`)
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
    it('should throw an error if the center to be edited does not exist', (done) => {
      request.put(`${centerApi}/400?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(centerSeed)
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
    it('should successfully modify a center\'s detail', (done) => {
      const testCenter = { ...centerSeed };
      testCenter.description = 'Brand new center here';
      request.put(`${centerApi}/${centerSeed.id}?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testCenter)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
  });
  describe('Delete center endpoint', () => {
    it('Should return an error if the user is not an admin', (done) => {
      request.delete(`${deleteCenter}/${centerSeed
        .id}?token=${dummyUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(centerSeed)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          done();
        });
    });
    it('should return an error if the center does not exist', (done) => {
      request.delete(`${deleteCenter}/100?token=${adminUser.token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
    it(
      'should successfully delete a center if the user is an admin',
      (done) => {
        request.delete(`${deleteCenter}/${centerSeed
          .id}?token=${adminUser.token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      }
    );
  });
  describe('Get centers endpoint', () => {
    it('should fetch all centers in the application', (done) => {
      request.get(centerApi)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('should return a 404 error if no center is found', (done) => {
      request.get('/api/v1/center/1000')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(404);
          done();
        });
    });
    it('should fetch a single center in the application', (done) => {
      request.get('/api/v1/center/1')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
  describe('Search centers endpoint test', () => {
    it(
      'should return an empty array if no center is found for search',
      (done) => {
        request.get('/api/v1/centers/search?search=James palace')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('No center found with this name or location');
            done();
          });
      }
    );
    it('should handle a server error when one occurs', (done) => {
      request.get('/api/v1/centers/search?search=Yaba Beach')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((error, response) => {
          expect(response.body.message).to.equal('Found 1 center(s) matching Yaba Beach.');
          expect(response.body.centerDetails).to.be.an('array');
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
});
