export const pagination = (start, length) => {
  if (
    (start !== null || start !== undefined) &&
    (length !== null || length !== undefined)
  ) {
    return {
      limit: length,
      offset: start,
    };
  } else {
    return {};
  }
};
