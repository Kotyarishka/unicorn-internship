import mongoose from "mongoose";

export interface ProviderDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  name: string;
  country: string;

  marketShare: number;
  renewableEnergyPercentage: number;
  yearlyRevenue: number;
}

const providerSchema = new mongoose.Schema<ProviderDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    marketShare: {
      type: Number,
      required: true,
    },
    renewableEnergyPercentage: {
      type: Number,
      required: true,
    },
    yearlyRevenue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProviderModel = mongoose.model<ProviderDocument>(
  "Provider",
  providerSchema
);
