const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("emails", {
      emailid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subject: { type: Sequelize.DataTypes.STRING, allowNull: true },
      bodytext: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      bodyhtml: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      threadid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdat: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "userid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isread: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
      },
      inreplyto: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      scheduledat: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      snippet: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isarchieved: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      istrashed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      msgid: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      fromdata:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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