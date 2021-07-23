const { DataTypes } = require("sequelize/types");

const TipoCursoModel = sequelize.define(
  "tipo_curso",
  {
    id_tipo_curso: {
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
  { tableName: "tipo_curso", createdAt: false, updatedAt: false }
);

module.exports = { TipoCursoModel };
