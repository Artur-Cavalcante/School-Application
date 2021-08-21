const { DataTypes } = require("sequelize");
const { _dbContext } = require("@/infra/context");

const { CursoModel } = require("@/models/curso/cursoModel");
const {
  TipoDisciplinaModel,
} = require("@/models/tipo-disciplina/tipoDisciplinaModel");

const DisciplinaModel = _dbContext.define(
  "disciplina",
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_sigla: {
      type: DataTypes.STRING,
      unique: true,
      length: 10,
      allowNull: false,
    },
    tx_descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    in_periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "disciplina", createdAt: false, updatedAt: false }
);

CursoModel.hasMany(DisciplinaModel);
TipoDisciplinaModel.hasMany(DisciplinaModel);

module.exports = { DisciplinaModel };
