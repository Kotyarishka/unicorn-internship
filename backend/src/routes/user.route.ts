import { Router } from "express";
import { getUserHandler } from "../controllers/user.controller";

// prefix: /user
const userRoutes = Router();

userRoutes.get("/", getUserHandler);

export default userRoutes;
