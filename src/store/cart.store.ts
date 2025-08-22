import { Product } from "@/interfaces/product";
import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { create } from "zustand";

type CartState = {
  isLoading: boolean;
  isOpen: boolean;
  items: { product: Product; quantity: number }[];
  supabase: SupabaseClient;
  trigger: () => void;
  getAll: () => Promise<void>;
  add: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
};

// cart store
export const useCartStore = create<CartState>((set, get) => ({
  isLoading: true,
  isOpen: false,
  items: [],
  supabase: createClient(),
  trigger() {
    set((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  },
  async getAll() {
    const { supabase } = get();

    const { data } = await supabase.from("carts").select("*");

    set((prev) => ({ ...prev, items: data, isLoading: false }));
  },
  async add(id) {
    const { supabase } = get();

    // first check product exists in the cart
    const { data } = await supabase
      .from("carts")
      .select("id,quantity")
      .eq("product_id", id)
      .single();

    // if product not found in the cart
    if (!data) {
      // insert in the cart
      const newItem = await supabase.from("carts").insert({
        product_id: id,
        quantity: 1,
      });
      if (newItem.error) {
        toast.error("Oops!", { description: "Please! Try Again" });
      } else {
        toast.success("Added to cart! 🛒");
      }
    }

    // update the cart item by product id
    const updateItem = await supabase
      .from("carts")
      .update({ quantity: data?.quantity + 1 })
      .eq("id", data?.id);

    if (updateItem.error) {
      toast.error("Oops!", { description: "Please! Try Again" });
    } else {
      toast.success("Added to cart! 🛒");
    }
  },
  async remove(id) {
    const { supabase } = get();
    const deleteItem = await supabase
      .from("carts")
      .delete()
      .eq("product_id", id);

    if (deleteItem.error) {
      toast.error("Oops!", { description: "Please! Try Again" });
    } else {
      toast.success("Deleted from cart!");
    }
  },
  async updateItem(id, quantity) {},
}));
