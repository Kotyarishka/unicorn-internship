import { z } from "zod";

export const createProviderSchema = z.object({
  name: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
  marketShare: z.coerce.number().int().min(0).max(100),
  renewableEnergyPercentage: z.coerce.number().int().min(0).max(100),
  yearlyRevenue: z.coerce.number().int(),
});
export const editProviderSchema = createProviderSchema.partial();

export type CreateProviderParams = z.infer<typeof createProviderSchema>;
export type EditProviderParams = z.infer<typeof editProviderSchema>;

const filterNumber = (from?: number, to?: number) =>
  z.coerce
    .number()
    .min(from ?? Number.MIN_SAFE_INTEGER)
    .max(to ?? Number.MAX_SAFE_INTEGER)
    .optional();
const filterString = z.string().min(1).max(255).optional();

export const providerFiltersSchema = z
  .object({
    name: filterString,
    country: filterString,
    marketShare: z
      .object({
        from: filterNumber(0, 100),
        to: filterNumber(0, 100),
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

export type ProviderFilters = z.infer<typeof providerFiltersSchema>;
