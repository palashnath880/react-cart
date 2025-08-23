import { useRef, useState } from "react";
import { toast } from "sonner";
import z from "zod";

// email validation schema
const emailSchema = z.email();

/**
 * useSubscribe hook
 * Handle subscribe input
 * @returns
 */
export default function useSubscribe() {
  // state
  const [loading, setLoading] = useState<boolean>(false);

  // input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // subscribe function
  const subscribe = async () => {
    // if input not found
    if (!inputRef.current) return;

    // input value
    const value = inputRef.current.value;

    // if value is empty
    if (!value) return;

    const { error } = await emailSchema.safeParseAsync(value);
    if (error) {
      toast.error("Sorry! Invalid email address.");
      return;
    }

    try {
      setLoading(true);
      toast.success("Great choice!", {
        description: "You’ve successfully joined our list.",
      });
      setLoading(false);
      inputRef.current.value = "";
    } catch {
      setLoading(false);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  return { loading, subscribe, inputRef };
}
