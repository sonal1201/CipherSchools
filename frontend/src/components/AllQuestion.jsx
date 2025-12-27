"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllQuestion() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllQuestion = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/v1/assignments`
        );
        setQuestions(response.data);
        setLoading(false);

        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setQuestions(null);
      }
    };

    getAllQuestion();
  }, []);

  const getQuestion = questions.data;

  if (!getQuestion) return <p>No assignments found</p>;
  if (loading) return <div>loading Data.....</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {getQuestion.map((q) => (
        <Link key={q._id} href={`/assignments/${q._id}`}>
          <div key={q._id}>
            <h3>{q.title}</h3>
            <p>{q.question}</p>
            <p>{q.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
