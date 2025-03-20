import { z } from "zod";

export const tokenSchema = z.object({
  description: z.string().optional(),
  expiresIn: z.coerce.number().int().optional(),
});
export type TokenInput = z.infer<typeof tokenSchema>;
