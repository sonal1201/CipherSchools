import { connectDb } from "../config/db.config.js";
import { Assignment } from "../models/assignment.model.js";

const assignment = [
  {
    title: "Count Total Employees",
    description: "Easy",
    question: "Find the total number of employees in the employees table.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
        ],
        rows: [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
          { id: 3, name: "Charlie" },
          { id: 4, name: "Diana" },
        ],
      },
    ],
    expectedOutput: {
      type: "count",
      value: 4,
    },
  },

  {
    title: "View All Employees",
    description: "Easy",
    question: "Retrieve all employees from the employees table.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
          { columnName: "salary", dataType: "INTEGER" },
        ],
        rows: [
          { id: 1, name: "Alice", salary: 45000 },
          { id: 2, name: "Bob", salary: 60000 },
        ],
      },
    ],
    expectedOutput: {
      type: "table",
      value: [
        { name: "Alice", salary: 45000 },
        { name: "Bob", salary: 60000 },
      ],
    },
  },

  {
    title: "High Salary Employees",
    description: "Easy",
    question: "List employees earning more than 50,000.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "TEXT" },
          { columnName: "salary", dataType: "INTEGER" },
        ],
        rows: [
          { id: 1, name: "Alice", salary: 45000 },
          { id: 2, name: "Bob", salary: 60000 },
          { id: 3, name: "Charlie", salary: 75000 },
        ],
      },
    ],
    expectedOutput: {
      type: "table",
      value: [
        { name: "Bob", salary: 60000 },
        { name: "Charlie", salary: 75000 },
      ],
    },
  },

  {
    title: "Highest Salary",
    description: "Easy",
    question: "Find the highest salary among all employees.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [{ columnName: "salary", dataType: "INTEGER" }],
        rows: [{ salary: 45000 }, { salary: 60000 }, { salary: 75000 }],
      },
    ],
    expectedOutput: {
      type: "single_value",
      value: 75000,
    },
  },
];

const seedDb = async () => {
  try {
    await connectDb();
    const seedDone = await Assignment.insertMany(assignment);
    if (seedDb) {
      console.log("seeding done");
      process.exit(1);
    }
  } catch (error) {
    console.log(error.message);
    console.log("seedFailed");
  }
};

seedDb();
