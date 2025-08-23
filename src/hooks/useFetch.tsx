import { useState } from "react";

/**
 * useFetch hook
 * @returns
 */

type UseFetch = {
  error?: () => void;
  method?: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
};

export default function useFetch<T>(params: UseFetch) {
  const { error, method = "GET" } = params;

  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetcher = async (url: string) => {
    setLoading(true);
    const res = await fetch(url, {
      method,
    });
    if (!res.ok) {
      if (typeof error === "function") error();
      return;
    }
    setLoading(false);
    setData(await res.json());
  };

  return { loading, fetch: fetcher, data };
}
