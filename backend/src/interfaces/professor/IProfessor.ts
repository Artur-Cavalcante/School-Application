import { Model } from "sequelize/types";

export interface IProfessor extends Model {
  id_professor: number;
  tx_nome: string;
  tx_sexo: string;
  tx_estado_civil: string;
  dt_nascimento: string;
  tx_telefone: string;
  id_titulo: number;
}
