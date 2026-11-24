import { ENDPOINTS } from "@/constants/config";

export async function recordVisit(): Promise<void> {
  try {
    const res = await fetch(ENDPOINTS.visitors, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    });
    if (!res.ok) throw new Error(`POST visitors failed: ${res.status}`);
  } catch (err) {
    console.warn("recordVisit error:", err);
  }
}

export async function fetchVisitors(): Promise<number | null> {
  try {
    const res = await fetch(ENDPOINTS.visitors, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`GET visitors failed: ${res.status}`);
    const data = await res.json();
    return typeof data.total === "number" ? data.total : null;
  } catch (err) {
    console.warn("fetchVisitors error:", err);
    return null;
  }
}
