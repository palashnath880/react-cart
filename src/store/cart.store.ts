import { Product } from "@/interfaces/product";
import { create } from "zustand";

type CartState = {
  isLoading: boolean;
  isOpen: boolean;
  items: { product: Product; quantity: number }[];
  trigger: () => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  updateItem: (id: string, quantity: number) => void;
};

// cart store
export const useCartStore = create<CartState>((set) => ({
  isLoading: true,
  isOpen: false,
  items: [],
  trigger() {
    set((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  },
  add(id) {},
  remove(id) {},
  updateItem(id, quantity) {},
}));
