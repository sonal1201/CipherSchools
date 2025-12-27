import express from "express";
import {
  excuteAssignment,
  getAllAssignment,
  getAssignmentById,
} from "../controllers/assignment.controller.js";

export const assignmentRoute = express.Router();

assignmentRoute.get("/", getAllAssignment);
assignmentRoute.get("/:id", getAssignmentById);
assignmentRoute.post("/:id/execute", excuteAssignment);
