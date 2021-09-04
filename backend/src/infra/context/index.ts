import { Sequelize } from "sequelize";
import { Dialect, Sequelize as TSequelize } from "sequelize/types";

import dotenv from "dotenv";

dotenv.config();

const _dbContext: TSequelize = new Sequelize(
  process.env.DATABASE_NAME ?? "",
  process.env.DATABASE_USERNAME ?? "",
  process.env.DATABASE_PASSWORD ?? "",
  {
    host: process.env.DATABASE_HOST,
    dialect: (process.env.DATABASE_DIALECT as Dialect) ?? "postgres",
  }
);

export { _dbContext };
