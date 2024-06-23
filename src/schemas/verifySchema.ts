import z from "zod";

export const verifySchema = z.object({
  code: z.string().length(4, "Invalid verification code"),
});
