import { DataTypes, ModelCtor } from "sequelize";
import { _dbContext } from "@/infra/context";

import { TituloModel } from "@/models/titulo/tituloModel";
import { IProfessor } from "@/interfaces/professor/IProfessor";

const ProfessorModel: ModelCtor<IProfessor> = _dbContext.define(
  "professor",
  {
    id_professor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tx_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tx_sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tx_estado_civil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dt_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tx_telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_titulo: {
      //@ts-ignore
      model: TituloModel,
      key: "id_titulo",
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "professor", createdAt: false, updatedAt: false }
);

TituloModel.hasMany(ProfessorModel, {
  foreignKey: "id_titulo",
});

export { ProfessorModel };
