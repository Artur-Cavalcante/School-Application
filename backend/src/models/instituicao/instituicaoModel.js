const { DataTypes } = require("sequelize/types");

const InstituicaoModel = sequelize.define(
  "instituicao",
  {
    id_instituicao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_sigla: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    tx_descricao: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { tableName: "instituicao", createdAt: false, updatedAt: false }
);

module.exports = { InstituicaoModel };
