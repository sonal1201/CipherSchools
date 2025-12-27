import express from "express";
import {
  getAllAssignment,
  getAssignmentById,
} from "../controllers/assignment.controller.js";

export const assignmentRoute = express.Router();

assignmentRoute.get("/", getAllAssignment);
assignmentRoute.get("/:id", getAssignmentById);
