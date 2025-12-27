"use client";
import EditorSql from "@/components/EditorSql";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function QuestionPanel({id}) {
  const [assignment, setAssignment] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/assignments/${id}`
        );
        setAssignment(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch assignment");
        setAssignment(null);
      }
    };
    fetchAssignment();
  }, [id]);
  if (!assignment) return <p>No assignment found</p>;
  if (loading) return <div>loading Data.....</div>;
  if (error) return <p>Error: {error}</p>;

  console.log(assignment);

  const expected = assignment.data.expectedOutput;

  return (
    <div>
      Assignment
      <h1>{assignment.data.title}</h1>
      <p>{assignment.data.question}</p>
      <p>Difficulty: {assignment.data.description}</p>
      {assignment.data.sampleTables.map((table) => (
        <div key={table._id} style={{ marginTop: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
            Table: {table.tableName}
          </h2>

          <table
            border="1"
            style={{
              width: "30%",
            }}
          >
            <thead>
              <tr>
                {table.columns.map((col) => (
                  <th
                    key={col._id}
                    style={{
                      border: "1px solid #000",
                      padding: "6px",
                      textAlign: "left",
                    }}
                  >
                    {col.columnName}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {table.columns.map((col) => (
                    <td
                      key={col._id}
                      style={{
                        border: "1px solid #000",
                        padding: "6px",
                      }}
                    >
                      {row[col.columnName]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {expected.type === "table" && (
        <div>
          <h2>Expected Output</h2>

          <table border="1" cellPadding="6">
            <thead>
              <tr>
                {Object.keys(expected.value[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {expected.value.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((val, colIndex) => (
                    <td key={colIndex}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {expected.type === "count" && (
        <div>
          <h2>Expected Output</h2>
          <strong>{expected.value}</strong>
        </div>
      )}
      {expected.type === "single_value" && (
        <div>
          <h2>Expected Output</h2>
          <strong>{expected.value}</strong>
        </div>
      )}
      {expected.type === "column" && (
        <div>
          <h2>Expected Output</h2>
          <ul>
            {expected.value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
