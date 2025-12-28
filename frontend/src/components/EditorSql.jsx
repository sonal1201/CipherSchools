"use client";

import Editor from "@monaco-editor/react";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import OutputPanel from "./OutputPanel.jsx";

export default function EditorSql() {
  const { id } = useParams();

  const [query, setQuery] = useState("SELECT * FROM employees;");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  function getSessionId() {
    let sessionId = localStorage.getItem("cipher_session_id");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("cipher_session_id", sessionId);
    }

    return sessionId;
  }

  const handleSubmit = async () => {
    if (!id || !query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const sessionId = getSessionId();

      const response = await axios.post(
        `http://localhost:3001/api/v1/assignments/${id}/execute`,
        { sql: query, sessionId }
      );

      setResult(response.data.result);
      setIsCorrect(response.data.isCorrect);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="editor-panel">
        <Editor
          height="50vh"
          width="40vw"
          defaultLanguage="sql"
          value={query}
          theme="vs-dark"
          onChange={(value) => setQuery(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
        <div className="query-button">
        <button
          className="run-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Running..." : "Run"}
        </button>
       
        </div>

      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {isCorrect !== null && (
        <p style={{ color: isCorrect ? "green" : "orange" }}>
          {isCorrect ? "Correct query" : "Query executed, but output is wrong"}
        </p>
      )}

      {result && <OutputPanel data={result} />}
    </div>
  );
}
