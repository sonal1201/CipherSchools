function formatCell(value) {
  if (value === null) return "NULL";

  // Date string
  if (typeof value === "string" && value.includes("T")) {
    return value.split("T")[0];
  }

  return value.toString();
}


export default function OutputPanel({ data }) {
  if (!data) return null;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="output-empty">
        No rows returned
      </div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="output-wrapper">
      <table className="output-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>
                  {formatCell(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
