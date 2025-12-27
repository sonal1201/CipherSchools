"use client";

import Editor from "@monaco-editor/react";

import React, { useState } from "react";

export default function EditorSql() {
  const [query, setQuery] = useState("Select * from Employee");
  return (
    <Editor
      height="80vh"
      width="50vw"
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
  );
}
