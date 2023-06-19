'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context: queryInterface}) {
    queryInterface.sequelize.query('CREATE TABLE users (userId int PRIMARY KEY AUTO_INCREMENT, name varchar(255), emailAddress varchar(255), accessToken varchar(255), refToken varchar(255),expiryDate DATE)');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};