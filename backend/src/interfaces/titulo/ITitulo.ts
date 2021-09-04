import { Model } from "sequelize/types";

export interface ITitulo extends Model {
  id_titulo: number;
  tx_descricao: string;
}
