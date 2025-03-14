import { z } from "zod";

const filterNumber = (from?: number, to?: number, fieldName?: string) =>
  z
    .number()
    .int()
    .min(from ?? Number.MIN_SAFE_INTEGER, {
      message: fieldName
        ? `${fieldName} should be greater than or equal to ${from}`
        : undefined,
    })
    .max(to ?? Number.MAX_SAFE_INTEGER, {
      message: fieldName
        ? `${fieldName} should be less than or equal to ${to}`
        : undefined,
    })
    .optional();
const filterString = z.preprocess((val) => {
  if (typeof val !== "string") {
    return val;
  }
  if (val.trim() === "") {
    return undefined;
  }
  return val;
}, z.string().min(1).max(255).nullish().optional());

const providerFiltersSchema = z
  .object({
    name: filterString,
    country: filterString,
    marketShare: z
      .object({
        from: filterNumber(0, 100, "Market share from"),
        to: filterNumber(0, 100, "Market share to"),
      })
      .refine(({ from, to }) => (from && to ? from <= to : true), {
        message: "From should be less than or equal to To",
      })
      .optional(),
    renewableEnergyPercentage: z
      .object({
        from: filterNumber(0, 100),
        to: filterNumber(0, 100),
      })
      .refine(({ from, to }) => (from && to ? from <= to : true), {
        message: "From should be less than or equal to To",
      })
      .optional(),
    yearlyRevenue: z
      .object({
        from: filterNumber(0),
        to: filterNumber(0),
      })
      .refine(({ from, to }) => (from && to ? from <= to : true), {
        message: "From should be less than or equal to To",
      })
      .optional(),
  })
  .default({});
export type ProviderFiltersInput = z.infer<typeof providerFiltersSchema>;

export default providerFiltersSchema;
