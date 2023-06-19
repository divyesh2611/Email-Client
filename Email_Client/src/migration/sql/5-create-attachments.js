'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context: queryInterface}) {
    queryInterface.sequelize.query("CREATE TABLE email_attachment (attachmentId int auto_increment primary key, emailId int, fileName varchar(255), size int, type varchar(255), path varchar(255), FOREIGN KEY(emailId) REFERENCES emails(emailId) ON DELETE CASCADE)");
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