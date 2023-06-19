'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context: queryInterface}) {
    queryInterface.sequelize.query("CREATE TABLE email_recipient (recipientId int auto_increment PRIMARY KEY, emailId int, emailAddress varchar(255), type ENUM('from', 'to', 'cc', 'bcc'), FOREIGN KEY(emailId) REFERENCES emails(emailId) on delete cascade)");
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