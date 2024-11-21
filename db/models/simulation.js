"use strict";
const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const simulation = sequelize.define("simulation", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "Simulation",
    validate: {
      notNull: {
        msg: "title cannot be null",
      },
      notEmpty: {
        msg: "title cannot be empty",
      },
    },
  },
  desc: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

simulation.tableName = "simulation";

module.exports = simulation;
