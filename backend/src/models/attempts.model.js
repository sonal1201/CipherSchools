import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  sessionId: {
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
    default: Date.now(),
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
});

export const Attempt = mongoose.model("Attempt", attemptSchema);
