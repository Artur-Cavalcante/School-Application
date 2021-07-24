const { DataTypes } = require("sequelize");
const { _sequelize } = require("@/infra/context");

const { AlunoModel } = require("@/models/aluno/alunoModel");
const { DisciplinaModel } = require("@/models/disciplina/disciplinaModel");

const CursaModel = _sequelize.define(
  "cursa",
  {
    id_ano: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    in_semestre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    in_faltas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nm_nota1: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    nm_nota2: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    nm_nota3: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    bl_aprovado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { tableName: "cursa", createdAt: false, updatedAt: false }
);

AlunoModel.hasMany(CursaModel);
DisciplinaModel.hasMany(CursaModel);

module.exports = { CursaModel };
