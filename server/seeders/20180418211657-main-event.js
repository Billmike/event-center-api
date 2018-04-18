'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Events', [
      {
        name: 'Biker sports event',
        duration: 2,
        date: '2018-03-05 12:01:18.936+01',
        organizer: 1,
        venue: 1,
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        name: 'NBA Playoffs',
        duration: 2,
        date: '2018-03-05 12:01:18.936+01',
        organizer: 1,
        venue: 1,
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        name: 'Paralympics',
        duration: 2,
        date: '2018-03-05 12:01:18.936+01',
        organizer: 1,
        venue: 1,
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      }
    ]);
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
