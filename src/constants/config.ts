const API_URL = process.env.EXPO_PUBLIC_API_URL;
const ASSET_URL = process.env.EXPO_PUBLIC_ASSET_URL;

export const API_BASE_URL = API_URL?.replace(/\/+$/, "");
export const ASSET_BASE_URL = ASSET_URL?.replace(/\/+$/, "");

export const ENDPOINTS = {
  contact: `${API_BASE_URL}/email`,
  visitors: `${API_BASE_URL}/visitors`,
} as const;
