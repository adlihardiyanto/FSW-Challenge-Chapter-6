'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('UserGameHistories', [{
      UserGameId: 1,
      playing_time: new Date(),
      result: 'WIN',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
    await queryInterface.bulkInsert('UserGameHistories', [{
      UserGameId: 1,
      playing_time: new Date(),
      result: 'DRAW',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
    await queryInterface.bulkInsert('UserGameHistories', [{
      UserGameId: 2,
      playing_time: new Date(),
      result: 'LOSE',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
    await queryInterface.bulkInsert('UserGameHistories', [{
      UserGameId: 2,
      playing_time: new Date(),
      result: 'DRAW',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('UserGameHistories', null, {})
  }
};
