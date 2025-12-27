"use client";
import EditorSql from "@/components/EditorSql";
import QuestionPanel from "@/components/QuestionPanel.jsx";
import { useParams } from "next/navigation";


export default function Assignment() {
  const { id } = useParams();
  return (
    <div>
      <QuestionPanel id={id} />
      <EditorSql />
    </div>
  );
}
