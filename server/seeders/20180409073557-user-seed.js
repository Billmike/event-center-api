'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'piedpiper',
        email: 'qwertyuiop@gmail.com',
        password: 'qwertyuiop',
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        username: 'sadamhussein',
        email: 'sadamhussein@gmail.com',
        password: 'qwertyuiop',
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
