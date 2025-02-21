'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      experience: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      before: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      format: {
        type: Sequelize.ENUM,
        values: ['Удаленно', 'Офис', 'Гибрид'],
        allowNull: false,
      },
      schedule: {
        type: Sequelize.ENUM,
        values: ['Полная', 'Частичная', 'Проектная'],
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Conditions');
  },
};
