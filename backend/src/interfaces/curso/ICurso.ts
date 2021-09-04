import { Model } from "sequelize/types";

export interface ICurso extends Model {
  id_curso: number;
  tx_descricao: string;
  id_instituicao: number;
  id_tipo_curso: number;
}
