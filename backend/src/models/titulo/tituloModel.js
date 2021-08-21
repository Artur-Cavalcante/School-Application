const { DataTypes } = require("sequelize");
const { _dbContext } = require("@/infra/context");

const TituloModel = _dbContext.define(
  "titulo",
  {
    id_titulo: {
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
  { tableName: "titulo", createdAt: false, updatedAt: false }
);

module.exports = { TituloModel };
