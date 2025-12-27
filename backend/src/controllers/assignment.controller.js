import { pool } from "../config/postgresDb.config.js";
import TryCatch from "../middleware/tryCatach.middleware.js";
import { Assignment } from "../models/assignment.model.js";
import { compareResult } from "../utils/resultCompareHelper.js";
import { IsVaildQuary } from "../utils/vaildQuery.utils.js";

export const getAllAssignment = TryCatch(async (req, res) => {
  const assignments = await Assignment.find({});

  return res.status(200).json({
    message: "Fetched all assignment",
    data: assignments,
  });
});

export const getAssignmentById = TryCatch(async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    return res.status(404).json({
      success: false,
      message: "Question Not found",
    });
  }

  return res.status(200).json({
    message: `${assignment.title} assignment`,
    data: assignment,
  });
});

export const excuteAssignment = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { sql } = req.body;

  if (!sql) {
    return res.status(400).json({
      success: false,
      error: "assignmentId and sql are required",
    });
  }

  if (!IsVaildQuary(sql)) {
    return res.status(400).json({
      success: false,
      error: "only SELECT queries are allowed",
    });
  }

  try {
    const { rows } = await pool.query(sql);
    console.log(rows);
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
    }

    //    console.log(assignment.expectedOutput.type)
    // console.log(assignment.expectedOutput.value);

    const isCorrect = compareResult({
      type: assignment.expectedOutput.type,
      actual: rows,
      expected: assignment.expectedOutput.value,
    });

    console.log(isCorrect);

    return res.status(200).json({
      success: true,
      isCorrect,
      result: rows,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});
