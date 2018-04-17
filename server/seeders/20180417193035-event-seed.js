'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Centers', [
      {
        name: 'Muson Center',
        description: 'LA\'s finest basketball center',
        state: 'Los Angeles',
        location: 'South LA',
        capacity: '20000',
        equipments: 'Seats\nCourts\nTrap',
        availability: 'available',
        price: '20000',
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        name: 'Yaba Beach',
        description: 'Best beach in lagos',
        state: 'Los Angeles',
        location: 'South LA',
        capacity: '20000',
        equipments: 'Seats\nCourts\nTrap',
        availability: 'available',
        price: '20000',
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      }
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
