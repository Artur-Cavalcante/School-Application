const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");

dotenv.config();

const _dbContext = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);

export { _dbContext };
