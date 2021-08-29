import { DataTypes } from "sequelize";
import { _dbContext } from "@/infra/context";

const InstituicaoModel = _dbContext.define(
  "instituicao",
  {
    id_instituicao: {
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
      unique: true,
      allowNull: false,
    },
  },
  { tableName: "instituicao", createdAt: false, updatedAt: false }
);

export { InstituicaoModel };
