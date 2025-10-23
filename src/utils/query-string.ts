export const getQueryString = (
  queryParams: Record<string, string | number>,
) => {
  const queryString = Object.entries(queryParams).reduce(
    (a, [key, value]) => `${a}${key}=${value}&`,
    "?",
  );
  return queryString.substring(0, queryString.length - 1);
};
