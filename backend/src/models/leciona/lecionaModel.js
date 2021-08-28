const { DataTypes } = require("sequelize");
const { _dbContext } = require("@/infra/context");

const { ProfessorModel } = require("@/models/professor/professorModel");
const { DisciplinaModel } = require("@/models/disciplina/disciplinaModel");

const LecionaModel = _dbContext.define(
  "leciona",
  {
    id_disciplina: {
      primaryKey: true,
      model: DisciplinaModel,
      key: "id_disciplina",
      type: DataTypes.INTEGER,
    },

    id_professor: {
      primaryKey: true,
      model: ProfessorModel,
      key: "id_professor",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "leciona", createdAt: false, updatedAt: false }
);

ProfessorModel.hasMany(LecionaModel, {
  foreignKey: "id_professor",
});
DisciplinaModel.hasMany(LecionaModel, {
  foreignKey: "id_disciplina",
});

module.exports = { LecionaModel };
