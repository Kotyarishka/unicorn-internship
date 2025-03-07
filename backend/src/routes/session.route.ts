import { Router } from "express";
import {
  deleteSessionHandler,
  getSessionsHandler,
} from "../controllers/session.controller";

// prefix: /sessions
const sessionRoutes = Router();

sessionRoutes.get("/", getSessionsHandler);
sessionRoutes.delete("/:sessionId", deleteSessionHandler);

export default sessionRoutes;
