import { Router } from "express";
import {
  createTokenHandler,
  deleteTokenHandler,
  getTokensHandler,
} from "src/controllers/token.controller";

// prefix: /tokens
const tokenRoutes = Router();

tokenRoutes.get("/", getTokensHandler);
tokenRoutes.post("/", createTokenHandler);
tokenRoutes.delete("/:tokenId", deleteTokenHandler);

export default tokenRoutes;
