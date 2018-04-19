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
        startTime: '19:00:00',
        endTime: '20:00:00',
        duration: '1hour(s), 00minutes',
        date: '2018-03-05 12:01:18.936+01',
        organizer: 1,
        venue: 1,
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        name: 'NBA Playoffs',
        startTime: '17:00:00',
        endTime: '18:00:00',
        duration: '1hour(s), 00minutes',
        date: '2018-03-05 12:01:18.936+01',
        organizer: 1,
        venue: 1,
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        name: 'Paralympics',
        startTime: '10:00:00',
        endTime: '15:00:00',
        duration: '5hour(s), 00minutes',
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
