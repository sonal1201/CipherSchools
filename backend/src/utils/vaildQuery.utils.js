export function IsVaildQuary(sql) {
  const validateQuery = sql.trim().toLowerCase();

  if (!validateQuery.startsWith("select")) return false;

  const forbidden = [
    "insert",
    "update",
    "delete",
    "drop",
    "alter",
    "truncate",
    "create",
  ];

  return !forbidden.some((word) => validateQuery.includes(word));
}
