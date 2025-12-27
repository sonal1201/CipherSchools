import express from "express";
import { llmHint } from "../controllers/llmHint.Controller.js";

export const llmHintRoute = express.Router();

llmHintRoute.post("/", llmHint);
