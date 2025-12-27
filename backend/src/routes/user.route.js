import express from "express";
import { healthApi, loginUser } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/", loginUser);
userRouter.get("/health", healthApi);
