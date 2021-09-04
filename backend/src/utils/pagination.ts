import { IPagination } from "@/interfaces/pagination/IPagination";

export const pagination = (start?: number, length?: number): IPagination => {
  if (
    (start !== null || start !== undefined) &&
    (length !== null || length !== undefined)
  ) {
    return {
      limit: length,
      offset: start,
      rejectOnEmpty: false,
    };
  } else {
    return { rejectOnEmpty: false };
  }
};
