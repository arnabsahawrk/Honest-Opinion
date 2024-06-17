import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(15, "Username must be no more than 15 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Please use a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});
