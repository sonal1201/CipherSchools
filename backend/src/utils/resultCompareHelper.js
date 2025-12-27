function compareCount(rows, expected) {
  if (!Array.isArray(rows) || rows.length === 0) return false;

  const actual = Number(Object.values(rows[0])[0]);
  const expectedNumber = Number(expected);

  return actual === expectedNumber;
}

function compareSingleValue(rows, expected) {
  if (!Array.isArray(rows) || rows.length === 0) return false;

  const actual = Object.values(rows[0])[0];
  return actual === expected;
}

function normalizeValue(value) {
  // PostgreSQL Date object
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return value;
}


function compareTable(actualRows, expectedRows) {
  if (!Array.isArray(expectedRows)) return false;
  if (actualRows.length !== expectedRows.length) return false;

  const requiredColumns = Object.keys(expectedRows[0]);

  const normalizeRows = (rows) =>
    rows.map((row) => {
      const obj = {};
      for (const col of requiredColumns) {
        if (!(col in row)) return null;
        obj[col] = normalizeValue(row[col]);
      }
      return obj;
    });

  const normalizedActual = normalizeRows(actualRows);
  const normalizedExpected = normalizeRows(expectedRows);

  if (normalizedActual.includes(null)) return false;

  const sortRows = (rows) =>
    rows.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

  console.log( JSON.stringify(sortRows(normalizedActual)))
   console.log( JSON.stringify(sortRows(normalizedExpected)))

  return (
    JSON.stringify(sortRows(normalizedActual)) ===
    JSON.stringify(sortRows(normalizedExpected))
  );
}



export function compareResult({ type, actual, expected }) {
  switch (type) {
    case "count":
      return compareCount(actual, expected);

    case "single_value":
      return compareSingleValue(actual, expected);

    case "table":
      return compareTable(actual, expected);

    default:
      return false;
  }
}
