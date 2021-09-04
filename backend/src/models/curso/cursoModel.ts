import { DataTypes, ModelCtor } from "sequelize";
import { _dbContext } from "@/infra/context";

import { InstituicaoModel } from "@/models/instituicao/instituicaoModel";
import { TipoCursoModel } from "@/models/tipo-curso/tipoCursoModel";
import { ICurso } from "@/interfaces/curso/ICurso";

const CursoModel: ModelCtor<ICurso> = _dbContext.define(
  "curso",
  {
    id_curso: {
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
    id_instituicao: {
      //@ts-ignore
      model: InstituicaoModel,
      key: "id_instituicao",
      type: DataTypes.INTEGER,
    },
    id_tipo_curso: {
      //@ts-ignore
      model: TipoCursoModel,
      key: "id_tipo_curso",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "curso", createdAt: false, updatedAt: false }
);

InstituicaoModel.hasMany(CursoModel, {
  foreignKey: "id_instituicao",
});

TipoCursoModel.hasMany(CursoModel, {
  foreignKey: "id_tipo_curso",
});

export { CursoModel };
