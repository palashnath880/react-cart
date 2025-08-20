import z from "zod";

export const profileUpdateSchema = z.object({
  displayName: z.string().min(3).max(25),
  email: z.email(),
  phone: z.string().optional(),
});

export type IProfileUpdateInputs = z.infer<typeof profileUpdateSchema>;
