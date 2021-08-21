const { DataTypes } = require("sequelize");
const { _dbContext } = require("@/infra/context");

const TipoDisciplinaModel = _dbContext.define(
  "tipo_disciplina",
  {
    id_tipo_disciplina: {
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
  { tableName: "tipo_disciplina", createdAt: false, updatedAt: false }
);

module.exports = { TipoDisciplinaModel };
