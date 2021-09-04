import { Model } from "sequelize/types";

export interface IAluno extends Model {
  id_aluno: number;
  tx_nome: string;
  tx_sexo: string;
  dt_nascimento: string;
}
