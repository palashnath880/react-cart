import z from "zod";

// shipping method
export enum ShippingMethod {
  REGULAR,
  EXPRESS,
  OVERNIGHT,
}

// checkout form schema
export const checkoutFormSchema = z.object({
  email: z.email({ error: "Invalid email address", abort: true }),
  phone: z.string().min(1, { error: "Phone number is required." }),
  fname: z
    .string("First name is required")
    .trim()
    .min(3, "Minimum 3 characters")
    .max(14, "Maximum 14 characters"),
  lname: z
    .string()
    .min(2, "Minimum 2 characters")
    .max(14, "Maximum 14 characters")
    .optional()
    .or(z.literal("")),
  address: z.string().min(1, { error: "Address is required." }),
  city: z.string().min(1, { error: "City is required." }),
  state: z.string().min(1, { error: "State is required." }),
  zipcode: z.string().min(1, { error: "ZIP code is required." }),
  shippingMethod: z.enum(ShippingMethod),
  promoCode: z
    .string()
    .transform((val) => val?.replace(/\s+/g, "").toUpperCase())
    .optional()
    .or(z.literal("")),
});

// form inputs type
export type CheckoutInputs = z.infer<typeof checkoutFormSchema>;
