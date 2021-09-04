import { Model } from "sequelize/types";

export interface ITipoCurso extends Model {
  id_tipo_curso: number;
  tx_descricao: string;
}
