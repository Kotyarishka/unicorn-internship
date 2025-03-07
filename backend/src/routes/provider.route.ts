import { Router } from "express";
import {
  createProviderHandler,
  getProvidersHandler,
  getProviderHandler,
  updateProviderHandler,
  deleteProviderHandler,
} from "src/controllers/provider.controller";
import authenticate from "src/middleware/authenticate";

// prefix: /providers
const providerRoutes = Router();

providerRoutes.get("/", getProvidersHandler);
providerRoutes.get("/:id", getProviderHandler);
providerRoutes.post("/", authenticate(), createProviderHandler);
providerRoutes.put("/:id", authenticate(), updateProviderHandler);
providerRoutes.delete("/:id", authenticate(), deleteProviderHandler);

export default providerRoutes;
