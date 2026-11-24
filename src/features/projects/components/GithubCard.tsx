import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { GitBranch } from "lucide-react-native";
import * as Linking from "expo-linking";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GITHUB_URL } from "../data/projects";

interface Props {
  index: number;
}

export function GithubCard({ index }: Props) {
  const theme = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .springify()
        .damping(18)}
    >
      <Pressable
        onPress={() => Linking.openURL(GITHUB_URL)}
        style={[
          styles.card,
          {
            backgroundColor: theme.background,
            borderColor: theme.backgroundElement,
          },
        ]}
      >
        <View style={[styles.iconWrap, { backgroundColor: "#6366f1" }]}>
          <GitBranch color="#fff" size={28} />
        </View>

        <ThemedText style={styles.title}>Further Exploration</ThemedText>
        <ThemedText
          style={[styles.desc, { color: theme.textSecondary }]}
          numberOfLines={3}
        >
          Visit my GitHub repository to explore a complete collection of
          projects, experiments, and other open-source contributions.
        </ThemedText>

        <ThemedText style={[styles.cta, { color: "#6366f1" }]}>
          See More →
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: "700", textAlign: "center" },
  desc: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 10,
    maxWidth: 260,
  },
  cta: { marginTop: 16, fontSize: 13, fontWeight: "700" },
});
