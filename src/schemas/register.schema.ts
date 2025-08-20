import z from "zod";

export const registerFormSchema = z
  .object({
    fname: z
      .string("First name is required")
      .min(3, "Minimum 3 characters")
      .max(14, "Maximum 14 characters"),
    lname: z.string().min(3).max(14).optional(),
    email: z.email({ error: "Invalid email address", abort: true }).trim(),
    password: z
      .string("Password is required.")
      .min(6, "Password must be at least 6 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character."
      ),
    confirmPassword: z.string("Confirm password is required."),
    isAgree: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"],
  });

export type IRegisterInputs = z.infer<typeof registerFormSchema>;
