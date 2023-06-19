const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("users", {
      userid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      emailaddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      accesstoken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      reftoken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      expirydate:{
        type: Sequelize.DataTypes.DATE,
        allowNull:false
      }
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