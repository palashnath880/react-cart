import { User, Session, SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { create } from "zustand";
import { IProfileUpdateInputs } from "@/schemas/profile.schema";
import { toast } from "sonner";

type UserType = User & {
  user_metadata: {
    displayName: string;
  };
};

// store type
type AuthStoreType = {
  loading: boolean;
  user: UserType | null;
  session: Session | null;
  supabase: SupabaseClient;
  logout: () => void;
  init: () => Promise<void>;
  update: (user: IProfileUpdateInputs) => Promise<void>;
};

// use auth store
const useAuthStore = create<AuthStoreType>((set, get) => ({
  loading: true,
  user: null,
  session: null,
  supabase: createClient(),
  logout() {},
  async init() {
    const { supabase } = get();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    // if error found
    if (error)
      set((prev) => ({ ...prev, user: null, session: null, loading: false }));

    // if session found
    if (session?.user) {
      set((prev) => ({
        ...prev,
        user: session.user as UserType,
        session: session,
        loading: false,
      }));
    }

    // Set up auth state change listener
    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        set((prev) => ({
          ...prev,
          user: session.user as UserType,
          session: session,
          loading: false,
        }));
      } else {
        set((prev) => ({ ...prev, user: null, session: null, loading: false }));
      }
    });
  },
  async update(user) {
    try {
      const { supabase } = get();
      const { error } = await supabase.auth.updateUser({
        data: { displayName: user.displayName },
        phone: user.phone,
      });

      // if error found
      if (error) {
        toast.error("Update Failed!", {
          description: "We couldn't save your changes. Please try again.",
        });
        return;
      }

      // update user success toast
      toast.success("Success!", {
        description: "Your profile has been updated successfully.",
      });
    } catch {
      console.error(`Error: Update User`);
    }
  },
}));

export default useAuthStore;
