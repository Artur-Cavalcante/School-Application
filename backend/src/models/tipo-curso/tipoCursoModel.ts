import { ModelCtor } from "sequelize/types";

import { DataTypes } from "sequelize";
import { _dbContext } from "@/infra/context";
import { ITipoCurso } from "@/interfaces/tipo-curso/ITipoCurso";

const TipoCursoModel: ModelCtor<ITipoCurso> = _dbContext.define(
  "tipo_curso",
  {
    id_tipo_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_descricao: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { tableName: "tipo_curso", createdAt: false, updatedAt: false }
);

export { TipoCursoModel };
