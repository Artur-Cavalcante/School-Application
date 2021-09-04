import { Model } from "sequelize/types";

export interface ILeciona extends Model {
  id_disciplina: number;
  id_professor: number;
}
