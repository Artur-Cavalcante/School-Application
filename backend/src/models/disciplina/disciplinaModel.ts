import { DataTypes, ModelCtor } from "sequelize";
import { _dbContext } from "@/infra/context";

import { CursoModel } from "@/models/curso/cursoModel";
import { TipoDisciplinaModel } from "@/models/tipo-disciplina/tipoDisciplinaModel";
import { IDisicplina } from "@/interfaces/disciplina/IDisciplina";

const DisciplinaModel: ModelCtor<IDisicplina> = _dbContext.define(
  "disciplina",
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_sigla: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    tx_descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    in_periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 40,
      },
    },
    id_curso: {
      //@ts-ignore
      model: CursoModel,
      key: "id_curso",
      type: DataTypes.INTEGER,
    },
    id_tipo_disciplina: {
      //@ts-ignore
      model: TipoDisciplinaModel,
      key: "id_tipo_disciplina",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "disciplina", createdAt: false, updatedAt: false }
);

CursoModel.hasMany(DisciplinaModel, {
  foreignKey: "id_curso",
});
TipoDisciplinaModel.hasMany(DisciplinaModel, {
  foreignKey: "id_tipo_disciplina",
});

export { DisciplinaModel };
