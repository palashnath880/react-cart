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
  remove: (id?: string) => Promise<void>;
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
    set((prev) => ({ ...prev, isLoading: true }));

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
      await this.getAll();
    }
  },
  async remove(id) {
    const { getAll } = get();

    // set loading to true
    set((prev) => ({ ...prev, isLoading: true }));

    // request url
    const url = new URL(`${window.location.origin}/api/cart`);
    if (id) url.searchParams.set("itemId", id);

    // delete req
    const res = await fetch(url.toString(), { method: "DELETE" });
    const data = await res.json();

    // if request is failed
    if (!res.ok) {
      const message =
        data.message || "Sorry! Something went wrong. Please try again";
      toast.error(message);
      set((prev) => ({ ...prev, isLoading: false }));
    } else {
      toast.success("Deleted from cart!");
      await getAll();
    }
  },
  async updateItem(id, quantity) {
    console.log(id, quantity);
  },
}));
