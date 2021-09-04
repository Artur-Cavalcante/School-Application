import { DataTypes, ModelCtor } from "sequelize";
import { _dbContext } from "@/infra/context";
import { ITitulo } from "@/interfaces/titulo/ITitulo";

const TituloModel: ModelCtor<ITitulo> = _dbContext.define(
  "titulo",
  {
    id_titulo: {
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
  { tableName: "titulo", createdAt: false, updatedAt: false }
);

export { TituloModel };
