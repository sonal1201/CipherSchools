import { connectDb } from "../config/db.config.js";
import { Assignment } from "../models/assignment.model.js";

const employeesRows = [
  {
    id: 1,
    name: "Alice Johnson",
    salary: 90000,
    role: "Backend Engineer",
    join_date: "2021-06-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    salary: 75000,
    role: "Frontend Engineer",
    join_date: "2022-02-10",
  },
  {
    id: 3,
    name: "Charlie Brown",
    salary: 60000,
    role: "Marketing Executive",
    join_date: "2023-01-05",
  },
  {
    id: 4,
    name: "Diana Prince",
    salary: 85000,
    role: "Marketing Manager",
    join_date: "2020-09-20",
  },
  {
    id: 5,
    name: "Eve Adams",
    salary: 50000,
    role: "HR Executive",
    join_date: "2022-07-01",
  },
  {
    id: 6,
    name: "Frank Miller",
    salary: 65000,
    role: "HR Manager",
    join_date: "2019-11-12",
  },
  {
    id: 7,
    name: "Grace Lee",
    salary: 95000,
    role: "Finance Analyst",
    join_date: "2021-03-30",
  },
  {
    id: 8,
    name: "Henry Ford",
    salary: 120000,
    role: "Finance Manager",
    join_date: "2018-05-18",
  },
  {
    id: 9,
    name: "Ivy Chen",
    salary: 70000,
    role: "Operations Executive",
    join_date: "2022-10-25",
  },
  {
    id: 10,
    name: "Jack Wilson",
    salary: 88000,
    role: "Operations Manager",
    join_date: "2020-01-08",
  },
  {
    id: 11,
    name: "Temp Worker",
    salary: 40000,
    role: "Contractor",
    join_date: "2024-01-01",
  },
];

const assignments = [
  {
    title: "Count Total Employees",
    description: "Easy",
    question: "Find the total number of employees.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [{ columnName: "id", dataType: "INTEGER" }],
        rows: employeesRows.map((e) => ({ id: e.id })),
      },
    ],
    expectedOutput: {
      type: "count",
      value: 11,
    },
  },

  {
    title: "View All Employees",
    description: "Easy",
    question: "Retrieve name and salary of all employees.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "name", dataType: "TEXT" },
          { columnName: "salary", dataType: "INTEGER" },
        ],
        rows: employeesRows.map((e) => ({
          name: e.name,
          salary: e.salary,
        })),
      },
    ],
    expectedOutput: {
      type: "table",
      value: employeesRows.map((e) => ({
        name: e.name,
        salary: e.salary,
      })),
    },
  },

  {
    title: "High Salary Employees",
    description: "Easy",
    question: "List employees earning more than 80000.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "name", dataType: "TEXT" },
          { columnName: "salary", dataType: "INTEGER" },
        ],
        rows: employeesRows.map((e) => ({
          name: e.name,
          salary: e.salary,
        })),
      },
    ],
    expectedOutput: {
      type: "table",
      value: employeesRows
        .filter((e) => e.salary > 80000)
        .map((e) => ({ name: e.name, salary: e.salary })),
    },
  },

  {
    title: "Highest Salary",
    description: "Easy",
    question: "Find the highest salary.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [{ columnName: "salary", dataType: "INTEGER" }],
        rows: employeesRows.map((e) => ({ salary: e.salary })),
      },
    ],
    expectedOutput: {
      type: "single_value",
      value: 120000,
    },
  },

  {
    title: "Employees Joined After 2021",
    description: "Easy",
    question: "List employees who joined after 2021-01-01.",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "name", dataType: "TEXT" },
          { columnName: "join_date", dataType: "DATE" },
        ],
        rows: employeesRows.map((e) => ({
          name: e.name,
          join_date: e.join_date,
        })),
      },
    ],
    expectedOutput: {
      type: "table",
      value: employeesRows
        .filter((e) => e.join_date > "2021-01-01")
        .map((e) => ({ name: e.name, join_date: e.join_date })),
    },
  },
];

const seedDb = async () => {
  try {
    await connectDb();
    await Assignment.deleteMany({});
    const seedDone = await Assignment.insertMany(assignments);
    if (seedDone) {
      console.log("seeding done");
      process.exit(1);
    }
  } catch (error) {
    console.log(error.message);
    console.log("seedFailed");
  }
};

seedDb();
