const { DataTypes } = require("sequelize");
const { _dbContext } = require("@/infra/context");

const { AlunoModel } = require("@/models/aluno/alunoModel");
const { DisciplinaModel } = require("@/models/disciplina/disciplinaModel");

const CursaModel = _dbContext.define(
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
    id_aluno: {
      model: AlunoModel,
      key: "id_aluno",
      type: DataTypes.INTEGER,
    },
    id_disciplina: {
      model: DisciplinaModel,
      key: "id_aluno",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "cursa", createdAt: false, updatedAt: false }
);

AlunoModel.hasMany(CursaModel, {
  foreignKey: "id_aluno",
});
DisciplinaModel.hasMany(CursaModel, {
  foreignKey: "id_disciplina",
});

module.exports = { CursaModel };
