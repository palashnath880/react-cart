import { Product } from "@/interfaces/product";
import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { create } from "zustand";

// cart item
type CartItem = {
  product: Product;
  quantity: number;
  id: string;
  user_id: string;
};

// cart store type
type CartStoreState = {
  isLoading: boolean;
  isOpen: boolean;
  items: CartItem[];
  supabase: SupabaseClient;
  trigger: () => void;
  getAll: () => Promise<void>;
  add: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
};

// cart store
export const useCartStore = create<CartStoreState>((set, get) => ({
  isLoading: true,
  isOpen: false,
  items: [],
  supabase: createClient(),
  trigger() {
    set((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  },
  async getAll() {
    const res = await fetch(`/api/cart`);
    const data = await res.json();

    if (!res.ok) {
      // if request is failed
      set((prev) => ({ ...prev, isLoading: false }));
    } else {
      set((prev) => ({ ...prev, items: data, isLoading: false }));
    }
  },
  async add(id) {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ product_id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    // if request is failed
    if (!res.ok) {
      const message = data.message || "Sorry! Something went wrong";
      toast.error(message);
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
