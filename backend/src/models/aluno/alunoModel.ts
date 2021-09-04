import { ModelCtor } from "sequelize/types";

import { DataTypes } from "sequelize";
import { _dbContext } from "@/infra/context";
import { IAluno } from "@/interfaces/aluno/IAluno";

const AlunoModel: ModelCtor<IAluno> = _dbContext.define(
  "aluno",
  {
    id_aluno: {
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
    dt_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "aluno", createdAt: false, updatedAt: false }
);

export { AlunoModel };
