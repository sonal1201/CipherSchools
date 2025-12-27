import mongoose from "mongoose";
import assignmentModel from "./assignment.model";

const attemptSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  sqlQuery: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  lastAttempt: {
    type: Date,
    require: true,
    default: Date.now(),
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
});
