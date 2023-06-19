'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({context: queryInterface}) {
    queryInterface.sequelize.query('CREATE TABLE emails (emailId int primary key auto_increment, bodyHtml varchar(255), bodyText varchar(255), subject varchar(255), threadId int, createdAt varchar(255), userId int, isRead boolean, isArchieved boolean, isTrashed boolean, msgId int, inReplyTo varchar(255), scheduledAt varchar(255), snippet varchar(255), FOREIGN KEY(userId) REFERENCES users(userId) on delete cascade)');
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