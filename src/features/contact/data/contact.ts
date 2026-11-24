export type SocialContact = {
  id: string;
  label: string;
  url: string;
  color: string;
  backgroundColor: string;
};

export const socialContacts: SocialContact[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/6289664686245",
    color: "#16a34a",
    backgroundColor: "#dcfce7",
  },
  {
    id: "email",
    label: "Email",
    url: "mailto:marcosihombing72@gmail.com",
    color: "#ef4444",
    backgroundColor: "#fee2e2",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/marcosihombing/",
    color: "#2563eb",
    backgroundColor: "#dbeafe",
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/marco-sihombing",
    color: "#374151",
    backgroundColor: "#e5e7eb",
  },
];
