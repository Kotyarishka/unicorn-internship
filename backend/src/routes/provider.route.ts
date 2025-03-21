import { Router } from "express";
import {
  createProviderHandler,
  getProvidersHandler,
  getProviderHandler,
  updateProviderHandler,
  deleteProviderHandler,
} from "../controllers/provider.controller";
import authenticate from "../middleware/authenticate";

// prefix: /providers
const providerRoutes = Router();

providerRoutes.get("/", getProvidersHandler);
providerRoutes.get("/:id", getProviderHandler);
providerRoutes.post(
  "/",
  authenticate({
    user: [],
    token: [],
  }),
  createProviderHandler
);
providerRoutes.put(
  "/:id",
  authenticate({
    user: [],
    token: [],
  }),
  updateProviderHandler
);
providerRoutes.delete(
  "/:id",
  authenticate({
    user: [],
    token: [],
  }),
  deleteProviderHandler
);

export default providerRoutes;
