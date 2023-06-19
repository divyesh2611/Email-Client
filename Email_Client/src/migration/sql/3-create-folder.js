'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context:queryInterface}) {
    queryInterface.sequelize.query('CREATE TABLE email_folder (folderId int AUTO_INCREMENT PRIMARY KEY, folderName varchar(255), userId int, providerId int, FOREIGN KEY(userId) REFERENCES users(userId) on delete cascade)');
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