import z from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(30, { message: "Message must be at least 30 characters" })
    .max(1000, { message: "Message must be no longer than 1000 characters" }),
});
