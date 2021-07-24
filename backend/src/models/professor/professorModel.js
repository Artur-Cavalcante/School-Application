const { DataTypes } = require("sequelize");
const { _sequelize } = require("@/infra/context");

const { TituloModel } = require("@/models/titulo/tituloModel");

const ProfessorModel = _sequelize.define(
  "professor",
  {
    id_professor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tx_sexo: {
      type: DataTypes.STRING,
      length: 1,
      allowNull: false,
    },
    tx_estado_civil: {
      type: DataTypes.STRING,
      length: 1,
      allowNull: false,
    },
    dt_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tx_estado_civil: {
      type: DataTypes.STRING,
      length: 13,
      allowNull: false,
    },
  },
  { tableName: "professor", createdAt: false, updatedAt: false }
);

TituloModel.hasMany(ProfessorModel);

module.exports = { ProfessorModel };