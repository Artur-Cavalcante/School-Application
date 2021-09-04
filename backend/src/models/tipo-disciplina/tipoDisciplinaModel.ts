import { DataTypes, ModelCtor } from "sequelize";
import { _dbContext } from "@/infra/context";
import { ITipoDisciplina } from "@/interfaces/tipo-disciplina/ITipoDisciplina";

const TipoDisciplinaModel: ModelCtor<ITipoDisciplina> = _dbContext.define(
  "tipo_disciplina",
  {
    id_tipo_disciplina: {
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
  { tableName: "tipo_disciplina", createdAt: false, updatedAt: false }
);

export { TipoDisciplinaModel };
