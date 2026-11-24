import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Mapping nama skill → nama ikon MaterialCommunityIcons
const ICON_MAP: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  java: "language-java",
  bootstrap: "bootstrap",
  c: "language-c",
  cplusplus: "language-cpp",
  css3: "language-css3",
  dotnet: "dot-net",
  expo: "cellphone",
  express: "server",
  firebase: "firebase",
  javascript: "language-javascript",
  kubernetes: "kubernetes",
  laravel: "laravel",
  mariadb: "database",
  mongodb: "database",
  mysql: "database",
  nestjs: "cat",
  nextdotjs: "react",
  nodedotjs: "nodejs",
  numpy: "numeric",
  odoo: "briefcase",
  pandas: "chart-line",
  php: "language-php",
  postgresql: "database",
  prometheus: "fire",
  python: "language-python",
  react: "react",
  scikitlearn: "robot",
  spring: "leaf",
  supabase: "database",
  tailwindcss: "tailwind",
  tensorflow: "chart-bubble",
  typescript: "language-typescript",
};

type SkillIconProps = {
  name: string;
  color: string;
  size?: number;
};

export default function SkillIcon({ name, color, size = 38 }: SkillIconProps) {
  const iconName = ICON_MAP[name];

  // Fallback: kalau ikon tidak ada, tampilkan huruf pertama dari nama skill
  if (!iconName) {
    return (
      <MaterialCommunityIcons name="code-tags" size={size} color={color} />
    );
  }

  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
}
