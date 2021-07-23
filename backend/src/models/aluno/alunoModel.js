const { DataTypes } = require("sequelize/types");

const AlunoModel = sequelize.define(
  "aluno",
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_descricao: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { tableName: "aluno", createdAt: false, updatedAt: false }
);

module.exports = { AlunoModel };
