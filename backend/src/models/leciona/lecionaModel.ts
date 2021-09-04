import { DataTypes, ModelCtor } from "sequelize";
import { _dbContext } from "@/infra/context";

import { ProfessorModel } from "@/models/professor/professorModel";
import { DisciplinaModel } from "@/models/disciplina/disciplinaModel";
import { ILeciona } from "@/interfaces/leciona/ILeciona";

const LecionaModel: ModelCtor<ILeciona> = _dbContext.define(
  "leciona",
  {
    id_disciplina: {
      primaryKey: true,
      //@ts-ignore
      model: DisciplinaModel,
      key: "id_disciplina",
      type: DataTypes.INTEGER,
    },

    id_professor: {
      primaryKey: true,
      //@ts-ignore
      model: ProfessorModel,
      key: "id_professor",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "leciona", createdAt: false, updatedAt: false }
);

ProfessorModel.belongsToMany(DisciplinaModel, {
  through: LecionaModel,
  foreignKey: "id_professor",
});

DisciplinaModel.belongsToMany(ProfessorModel, {
  through: LecionaModel,
  foreignKey: "id_disciplina",
});

export { LecionaModel };
