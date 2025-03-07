import { z } from "zod";

const email = z.string().email().min(1).max(255);
const password = z.string().min(6).max(255);

export const loginSchema = z.object({
  email,
  password,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
