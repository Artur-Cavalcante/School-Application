import { Model } from "sequelize/types";

export interface ICursa extends Model {
  id_ano: number;
  in_semestre: number;
  in_faltas: number;
  nm_nota1: number;
  nm_nota2: number;
  nm_nota3: number;
  bl_aprovado: boolean;
  id_aluno: number;
  id_disciplina: number;
}
