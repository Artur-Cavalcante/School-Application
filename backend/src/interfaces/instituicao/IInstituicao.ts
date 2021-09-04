import { Model } from "sequelize/types";

export interface IInstituicao extends Model {
  id_instituicao: number;
  tx_sigla: string;
  tx_descricao: string;
}
