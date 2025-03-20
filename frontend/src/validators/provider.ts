import { z } from "zod";

// .string()
// .min(1)
// .max(3)
// .transform((v) => parseInt(v, 10))
// .pipe(z.number().int().min(0).max(100)),

export const createProviderSchema = z.object({
  name: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
  marketShare: z.coerce.number().int().min(0).max(100),
  renewableEnergyPercentage: z.coerce.number().int().min(0).max(100),
  yearlyRevenue: z.coerce.number().int().min(0),
});
export type CreateProviderInput = z.infer<typeof createProviderSchema>;

export const editProviderSchema = createProviderSchema.partial();
export type EditProviderInput = z.infer<typeof editProviderSchema>;
