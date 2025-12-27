import express from "express";
import { userRouter } from "./user.route.js";
import { assignmentRoute } from "./assignment.route.js";
import { llmHintRoute } from "./llmHint.Route.js";

export const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/assignments", assignmentRoute);
v1Router.use("/hint", llmHintRoute);
