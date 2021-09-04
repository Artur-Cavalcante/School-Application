import { Model } from "sequelize/types";

export interface ITipoDisciplina extends Model {
  id_tipo_disciplina: number;
  tx_descricao: string;
}
