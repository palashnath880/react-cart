import z from "zod";

// add to cart schema
export const addToCartSchema = z.object({
  product_id: z.string("Invalid product ID"),
  user_id: z.string("User ID is required."),
});
