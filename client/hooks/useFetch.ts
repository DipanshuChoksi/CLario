import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useFetch<T>(url: string | null) {
  const { data: session } = useSession();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session === undefined) return; // Loading session

    // If we need a session but don't have one, or the url is null, stop
    if (session === null || url === null) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    async function fetchData() {
      try {
        const res = await fetch(url as string);
        if (!res.ok) throw new Error(`Failed to fetch data for url: ${url}`);
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError("");
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [session, url]);

  return { data, loading, error };
}
