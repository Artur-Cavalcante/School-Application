const { DataTypes } = require("sequelize");
const { _sequelize } = require("@/infra/context");

const AlunoModel = _sequelize.define(
  "aluno",
  {
    id_aluno: {
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
      allowNull: false,
    },
    dt_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "aluno", createdAt: false, updatedAt: false }
);

module.exports = { AlunoModel };
