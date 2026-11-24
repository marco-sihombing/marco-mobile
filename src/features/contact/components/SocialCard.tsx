import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

import { Code2, Link, Mail, MessageCircle } from "lucide-react-native";

import type { SocialContact } from "../data/contact";

type Props = {
  item: SocialContact;
  isDark: boolean;
  onPress: (url: string) => void;
};

function SocialIcon({ id, color }: { id: string; color: string }) {
  switch (id) {
    case "whatsapp":
      return <MessageCircle size={23} color={color} />;

    case "email":
      return <Mail size={23} color={color} />;

    case "linkedin":
      return <Link size={23} color={color} />;

    case "github":
      return <Code2 size={23} color={color} />;

    default:
      return null;
  }
}

export default function SocialCard({ item, isDark, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(item.url)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: isDark ? "#374151" : "#ffffff",
          borderColor: isDark ? "#4b5563" : "#e5e7eb",
        },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[styles.iconWrapper, { backgroundColor: item.backgroundColor }]}
      >
        <SocialIcon id={item.id} color={item.color} />
      </View>

      <Text style={[styles.label, { color: isDark ? "#d1d5db" : "#374151" }]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
});
