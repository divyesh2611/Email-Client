const sequelize = require("sequelize");
const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("email_folder", {
      folderid: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      foldername: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      userid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "userid" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      providerid: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      priority : {
        type:sequelize.DataTypes.STRING,
        allowNull:true,
      },
      nextpagetoken:{
        type:sequelize.DataTypes.STRING,
        allowNull:true,
      },
      syncstatus:{
        type:sequelize.DataTypes.STRING,
        allowNull:true
      }
    });
    await queryInterface.addIndex("email_folder", ["foldername"], {
      name: "folder_name_idx",
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