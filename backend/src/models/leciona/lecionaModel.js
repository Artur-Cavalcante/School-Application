const { ProfessorModel } = require("@/models/professor/professorModel");
const { DisciplinaModel } = require("@/models/disciplina/disciplinaModel");

const LecionaModel = _sequelize.define("leciona", {}, { tableName: "leciona", createdAt: false, updatedAt: false });

ProfessorModel.hasMany(LecionaModel);
DisciplinaModel.hasMany(LecionaModel);

module.exports = { LecionaModel };
