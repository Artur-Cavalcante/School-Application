import { ModelAttributes } from "sequelize";

export interface IPagination {
  limit?: number;
  offset?: number;
  rejectOnEmpty: boolean;
}
