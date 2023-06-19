'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context: queryInterface}) {
    queryInterface.sequelize.query("CREATE TABLE email_folder_asso (emailId int, folderId int, FOREIGN KEY(emailId) REFERENCES emails(emailId) on delete cascade,FOREIGN KEY(folderId) REFERENCES email_folder(folderId) on delete cascade, PRIMARY KEY(emailId, folderId))");
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