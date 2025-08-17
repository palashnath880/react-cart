import { toast } from "sonner";
import { create } from "zustand";

type WishListStore = {
  items: string[];
  trigger: (id: string) => Promise<void>;
};

// wishlist store
const useWishList = create<WishListStore>((set, get) => ({
  items: [],
  trigger: (id) =>
    new Promise((resolve, reject) => {
      try {
        const { items } = get();
        const index = items.findIndex((i) => i === id);
        const newItems = [...items];

        index >= 0 ? newItems.splice(index, 1) : newItems.push(id);

        set((prev) => ({ ...prev, items: newItems })); // update wishlist items

        const msg = index >= 0 ? "Removed from wishlist" : "Added to wishlist!";
        toast.success(msg);

        resolve();
      } catch (err: any) {
        console.log(err);
        reject();
      }
    }),
}));

export default useWishList;
