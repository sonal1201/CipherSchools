import express from "express";
import { userRouter } from "./user.route.js";
import { assignmentRoute } from "./assignment.route.js";

export const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/assignments", assignmentRoute);
