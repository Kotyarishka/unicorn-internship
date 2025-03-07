import { z } from "zod";

const password = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: password,
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema
  .extend({
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;
