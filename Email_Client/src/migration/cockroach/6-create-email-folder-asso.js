const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("emails_folders_asso", {
      folderid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "email_folder",
          key: "folderid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      emailid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: {
          model: "emails",
          key: "emailid",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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