import z from "zod";

export const AiMessageSchema = z.object({
  aiMessage: z
    .string()
    .min(10, { message: "Must have 10 characters" })
    .max(100, { message: "No longer than 300 characters" }),
});
