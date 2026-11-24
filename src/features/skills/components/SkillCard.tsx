import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import SkillIcon from "./SkillIcon";

type SkillCardProps = {
  name: string;
  icon: string;
  iconColor?: string;
};

export default function SkillCard({
  name,
  icon,
  iconColor = "#6366F1",
}: SkillCardProps) {
  const { width } = useWindowDimensions();
  const isDark = useColorScheme() === "dark";

  const isMobile = width < 600;
  const cardWidth = isMobile ? 112 : width < 1024 ? 140 : 150;

  return (
    <View
      style={[
        styles.card,
        {
          width: cardWidth,
          backgroundColor: isDark
            ? "rgba(31,41,55,0.95)"
            : "rgba(255,255,255,0.95)",
          borderColor: isDark ? "#374151" : "#E5E7EB",
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDark ? "#263653" : "#EEF2FF",
          },
        ]}
      >
        <SkillIcon name={icon} color={iconColor} size={38} />
      </View>

      <Text
        style={[styles.name, { color: isDark ? "#E5E7EB" : "#1F2937" }]}
        numberOfLines={2}
      >
        {name}
      </Text>

      <View style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 160,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  iconContainer: {
    width: 62,
    height: 62,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 34,
  },

  name: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 14,
    paddingHorizontal: 2,
  },

  indicator: {
    width: 30,
    height: 3,
    borderRadius: 10,
    marginTop: 12,
    backgroundColor: "#6366F1",
  },
});
