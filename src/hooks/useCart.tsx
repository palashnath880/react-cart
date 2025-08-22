import { useCartStore } from "@/store/cart.store";
import { useState } from "react";

/**
 * useCart hook
 * Handle add / remove product from cart with loading state
 * @returns
 */
export default function useCart() {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  // cart store
  const cartStore = useCartStore((state) => state);

  // add handler
  const add = async (productId: string) => {
    setLoading(true);
    await cartStore.add(productId);
    setLoading(false);
  };

  // remove handler
  const remove = async (productId: string) => {
    setLoading(true);
    await cartStore.add(productId);
    setLoading(false);
  };

  return { loading, remove, add };
}
