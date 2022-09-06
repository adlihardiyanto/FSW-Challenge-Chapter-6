'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserGames', [{
      username: 'Adli',
      password: 'test123',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Rahadyan',
      password: 'test456',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGames', null, {});
  }
};
