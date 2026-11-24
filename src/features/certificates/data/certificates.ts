import { getAssetUrl } from "@/services/asset.service";

export interface Certificate {
  title: string;
  description: string;
  images: string[];
}

export const certificates: Certificate[] = [
  {
    title: "Lab Assistant",
    description:
      "Supervising programming and application development laboratory sessions for Informatics students at UNJANI.",
    images: ["/certs/unj1.jpg"],
  },
  {
    title: "Server Side",
    description: "Certificate to become a server side at BMKG Bengkulu",
    images: ["/certs/bmkg_2.png", "/certs/bmkg_3.png", "/certs/bmkg_1.png"],
  },
  {
    title: "Beginner Web Programming",
    description:
      "The certificate I obtained at SMKN 11 Bandung as a beginner in web programming",
    images: ["/certs/cakrawalaglobal_1.png", "/certs/cakrawalaglobal_2.png"],
  },
];

/** Helper untuk resolve semua image jadi absolute URL */
export function resolveCertificateImages(cert: Certificate): string[] {
  return cert.images.map((img) => getAssetUrl(img));
}
