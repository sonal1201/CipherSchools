"use client";
import EditorSql from "@/components/EditorSql";
import QuestionPanel from "@/components/QuestionPanel.jsx";
import { useParams } from "next/navigation";

export default function Assignment() {
  const { id } = useParams();
  return (
    <div className="question">
      <div className="question-panel">
        <QuestionPanel id={id} />
      </div>
      <div>
        <EditorSql />
      </div>
    </div>
  );
}
