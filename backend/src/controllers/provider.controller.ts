import HttpStatusCode from "src/constans/http";
import {
  createProvider,
  getProviders,
  getProvider,
  updateProvider,
  deleteProvider,
} from "src/services/provider.service";
import asyncHandler from "src/utils/asyncHandler";
import {
  createProviderSchema,
  editProviderSchema,
  providerFiltersSchema,
} from "./provider.schemas";

import { z } from "zod";

export const getProvidersHandler = asyncHandler(async (req, res) => {
  const filters = providerFiltersSchema.parse(req.query.filters);
  const providers = await getProviders(filters);

  return res.status(HttpStatusCode.OK).json({
    providers: providers.map((provider) => provider.toObject()),
    count: providers.length,
  });
});

export const getProviderHandler = asyncHandler(async (req, res) => {
  const id = z.string().parse(req.params.id);

  const provider = await getProvider(id);

  return res.status(HttpStatusCode.OK).json({ provider: provider.toObject() });
});

export const createProviderHandler = asyncHandler(async (req, res) => {
  const data = createProviderSchema.parse(req.body);

  const provider = await createProvider(data);

  const providers = await getProviders();
  console.log(providers);

  return res
    .status(HttpStatusCode.CREATED)
    .json({
      provider: provider.toObject(),
      message: "Provider created successfully",
    });
});

export const updateProviderHandler = asyncHandler(async (req, res) => {
  const id = z.string().parse(req.params.id);
  const data = editProviderSchema.parse(req.body);

  const provider = await updateProvider(id, data);

  return res
    .status(HttpStatusCode.OK)
    .json({
      provider: provider.toObject(),
      message: "Provider updated successfully",
    });
});

export const deleteProviderHandler = asyncHandler(async (req, res) => {
  const id = z.string().parse(req.params.id);

  await deleteProvider(id);

  return res.status(HttpStatusCode.OK).send({
    message: "Provider deleted successfully",
  });
});
