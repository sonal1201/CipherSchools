import AssignmentPage from "./assignments/page";

export default function Home() {
  return (
    <div>
      <div className="assignment-page">
        <h1 className="sql-heading">Sql Question</h1>
        <div className="assignment-table">
        <AssignmentPage />
        </div>
      </div>
    </div>
  );
}
