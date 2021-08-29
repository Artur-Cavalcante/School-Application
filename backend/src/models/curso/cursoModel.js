const { DataTypes } = require("sequelize");
const { _dbContext } = require("@/infra/context");

const { InstituicaoModel } = require("@/models/instituicao/instituicaoModel");
const { TipoCursoModel } = require("@/models/tipo-curso/tipoCursoModel");

const CursoModel = _dbContext.define(
  "curso",
  {
    id_curso: {
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
    id_instituicao: {
      model: InstituicaoModel,
      key: "id_instituicao",
      type: DataTypes.INTEGER,
    },
    id_tipo_curso: {
      model: TipoCursoModel,
      key: "id_tipo_curso",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "curso", createdAt: false, updatedAt: false }
);

InstituicaoModel.hasMany(CursoModel, {
  foreignKey: "id_instituicao",
});

TipoCursoModel.hasMany(CursoModel, {
  foreignKey: "id_tipo_curso",
});

module.exports = { CursoModel };
