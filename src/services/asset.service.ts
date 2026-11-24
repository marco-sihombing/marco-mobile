const ASSET_URL = process.env.EXPO_PUBLIC_ASSET_URL?.replace(/\/+$/, "");

export function getAssetUrl(path: string): string {
  // Jika URL sudah lengkap, gunakan langsung.
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!ASSET_URL) {
    throw new Error("EXPO_PUBLIC_ASSET_URL belum dikonfigurasi.");
  }

  // Menghindari slash ganda.
  return `${ASSET_URL}/${path.replace(/^\/+/, "")}`;
}
