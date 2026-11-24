import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { getAssetUrl } from "@/services/asset.service";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { Experience } from "../data/experiences";

interface Props {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: Props) {
  const theme = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .springify()
        .damping(18)}
      style={[
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.backgroundSelected,
        },
      ]}
    >
      {/* Logo */}
      <View
        style={[
          styles.logoWrapper,
          { backgroundColor: theme.backgroundSelected },
        ]}
      >
        <Image
          source={{ uri: getAssetUrl(experience.logo) }}
          style={styles.logo}
          contentFit="contain"
          transition={250}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {experience.title}
        </ThemedText>

        <ThemedText style={[styles.role, { color: theme.text }]}>
          {experience.role}
        </ThemedText>

        <ThemedText
          style={[styles.period, { color: theme.textSecondary }]}
          numberOfLines={1}
        >
          {experience.period.toUpperCase()}
        </ThemedText>

        <ThemedText
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={5}
        >
          {experience.description}
        </ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  logoWrapper: {
    alignSelf: "center",
    width: 92,
    height: 92,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logo: { width: 56, height: 56 },
  content: { flex: 1 },
  title: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  role: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },
  period: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  description: { fontSize: 13, lineHeight: 19, textAlign: "center" },
});
