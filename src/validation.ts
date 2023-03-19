import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
});

// infer type from schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
