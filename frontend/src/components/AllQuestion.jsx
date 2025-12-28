"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllQuestion() {
  const router = useRouter();

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
      <table className="questions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Question</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {getQuestion.map((q) => (
            <tr
              key={q._id}
              onClick={() => router.push(`/assignments/${q._id}`)}
              className="table-row"
            >
              <td>{q.title}</td>
              <td>{q.question}</td>
              <td>{q.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
