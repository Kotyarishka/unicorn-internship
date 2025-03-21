import {
  CreateProviderParams,
  EditProviderParams,
  ProviderFilters,
} from "../controllers/provider.schemas";
import { ProviderDocument, ProviderModel } from "../models/provider.model";

import { FilterQuery } from "mongoose";
import appAssert from "../utils/appAssert";
import HttpStatusCode from "../constans/http";

const generateFilters = (filters: ProviderFilters) => {
  const filterQuery: FilterQuery<ProviderDocument> = {};

  if (filters.name) {
    filterQuery.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.country) {
    filterQuery.country = filters.country;
  }

  if (filters.marketShare) {
    filterQuery.marketShare = {};

    if (filters.marketShare.from) {
      filterQuery.marketShare.$gte = filters.marketShare.from;
    }

    if (filters.marketShare.to) {
      filterQuery.marketShare.$lte = filters.marketShare.to;
    }
  }

  if (filters.renewableEnergyPercentage) {
    filterQuery.renewableEnergyPercentage = {};

    if (filters.renewableEnergyPercentage.from) {
      filterQuery.renewableEnergyPercentage.$gte =
        filters.renewableEnergyPercentage.from;
    }

    if (filters.renewableEnergyPercentage.to) {
      filterQuery.renewableEnergyPercentage.$lte =
        filters.renewableEnergyPercentage.to;
    }
  }

  if (filters.yearlyRevenue) {
    filterQuery.yearlyRevenue = {};

    if (filters.yearlyRevenue.from) {
      filterQuery.yearlyRevenue.$gte = filters.yearlyRevenue.from;
    }

    if (filters.yearlyRevenue.to) {
      filterQuery.yearlyRevenue.$lte = filters.yearlyRevenue.to;
    }
  }

  return filterQuery;
};

export const getProviders = async (filters: ProviderFilters = {}) => {
  const providers = await ProviderModel.find(generateFilters(filters), null, {
    sort: { createdAt: -1 },
  });

  return providers;
};

export const getProvider = async (id: string) => {
  const provider = await ProviderModel.findById(id);
  appAssert(provider, HttpStatusCode.NOT_FOUND, "Provider does not exist");

  return provider;
};

export const createProvider = async (data: CreateProviderParams) => {
  const provider = await ProviderModel.create(data);

  return provider;
};

export const updateProvider = async (id: string, data: EditProviderParams) => {
  const provider = await ProviderModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  appAssert(provider, HttpStatusCode.NOT_FOUND, "Provider does not exist");

  return provider;
};

export const deleteProvider = async (id: string) => {
  const provider = await ProviderModel.findByIdAndDelete(id);
  appAssert(provider, HttpStatusCode.NOT_FOUND, "Provider does not exist");

  return provider;
};
