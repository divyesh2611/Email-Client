const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("kafka_user", {
      uniqueid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      tenant: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    }); 
    await queryInterface.addConstraint('kafka_user', {
        fields: ['uniqueid','tenant'],
        type: 'primary key',
        name: 'kafka_user_pkey',
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};