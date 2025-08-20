import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Invalid email address", abort: true }).trim(),
  password: z.string("Password is required."),
  // rememberMe: z.boolean(),
});

export type ILoginInputs = z.infer<typeof loginFormSchema>;
