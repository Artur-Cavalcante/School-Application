import { Model } from "sequelize/types";

export interface IDisicplina extends Model {
    id_disciplina: number;
    tx_sigla: string;
    tx_descricao: string;
    in_periodo: number;
    in_carga_horaria: number;
    id_curso: number;
    id_tipo_disciplina: number;
}
