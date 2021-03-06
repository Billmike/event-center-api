'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'adminuser',
        email: 'admin@localhost.com',
        password: 'qwertyuiop',
        phoneNumber: '08012345678',
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        username: 'piedpiper',
        email: 'qwertyuiop@gmail.com',
        password: 'qwertyuiop',
        phoneNumber: '08012345678',
        createdAt: '2018-03-05 12:01:18.936+01',
        updatedAt: '2018-03-05 12:01:18.936+01'
      },
      {
        username: 'sadamhussein',
        email: 'sadamhussein@gmail.com',
        password: 'qwertyuiop',
        phoneNumber: '08012345678',
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
