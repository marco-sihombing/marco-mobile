import { fetchVisitors, recordVisit } from "@/services/visitor.service";
import { useEffect, useRef, useState } from "react";

export function useVisitors(pollMs = 5000) {
  const [total, setTotal] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      await recordVisit();
      const n = await fetchVisitors();
      if (mounted) setTotal(n);
    })();

    intervalRef.current = setInterval(async () => {
      const n = await fetchVisitors();
      if (mounted) setTotal(n);
    }, pollMs);

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pollMs]);

  return total;
}
