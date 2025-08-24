import z from "zod";

export const shopFilterSchema = z.object({
  priceRange: z
    .object({
      min: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number().min(0).max(5000).default(0)
      ),
      max: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z.number().min(0).max(5000).default(5000)
      ),
    })
    .refine(
      (data) => {
        if (data.min !== undefined && data.max !== undefined) {
          return data.min <= data.max; // Ensure min is less than or equal to max
        }
        return true; // If one of them is undefined, it's valid
      },
      { message: "Minimum price must be less than or equal to maximum price" }
    ),
  categories: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z.array(z.string()).default([])
  ),
  brands: z.preprocess(
    (val) => (Array.isArray(val) ? val : []),
    z.array(z.string()).default([])
  ),
  rating: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number().min(1).max(4)
    )
    .optional(),
});

export type ShopFilterType = z.infer<typeof shopFilterSchema>;
