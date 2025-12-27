import TryCatch from "../middleware/tryCatach.middleware.js";
import { Assignment } from "../models/assignment.model.js";

export const getAllAssignment = TryCatch(async (req, res) => {
  const assignments = await Assignment.find({});

  return res.status(200).json({
    message: "Fetched all assignment",
    data: assignments,
  });
});

export const getAssignmentById = TryCatch(async (req, res) => {
  const {id} = req.params;
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    return res.status(404).json({
      message: "Question Not found",
    });
  }

  return res.status(200).json({
    message: `${assignment.title} assignment`,
    data: assignment,
  });
});
