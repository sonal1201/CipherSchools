"use client";
import axios from "axios";
import { useState } from "react";

export default function HintButton({ question }) {
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState(null);
  const [error, setError] = useState(null);

  const getHint = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        "http://localhost:3001/api/v1/hint",
        { question }
      );

      setHint(res.data.hint);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to get hint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <button className="hint-button" onClick={getHint} disabled={loading}>
        {loading ? "Thinking…" : "Get Hint"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {hint && (
        <div
          style={{
            marginTop: 8,
            padding: 10,
            border: "1px solid #444",
            borderRadius: 4,
          }}
        >
          HINT:  {hint}
        </div>
      )}
    </div>
  );
}
