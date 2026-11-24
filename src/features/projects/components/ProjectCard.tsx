import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { getAssetUrl } from "@/services/asset.service";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { Project } from "../data/projects";

interface Props {
  project: Project;
  index: number;
  expanded: boolean;
  onToggleExpand: () => void;
}

export function ProjectCard({
  project,
  index,
  expanded,
  onToggleExpand,
}: Props) {
  const theme = useTheme();
  const canExpand = project.description.length > 120;

  const openLink = () => {
    if (project.link) Linking.openURL(project.link);
  };

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
      {/* Gambar (tap → link) */}
      <Pressable onPress={openLink}>
        <Image
          source={{ uri: getAssetUrl(project.image) }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />
      </Pressable>

      {/* Content */}
      <View style={styles.content}>
        <Pressable onPress={openLink}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {project.title}
          </ThemedText>
        </Pressable>

        <ThemedText
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={expanded ? undefined : 3}
        >
          {project.description}
        </ThemedText>

        {canExpand && (
          <Pressable onPress={onToggleExpand} hitSlop={8}>
            <ThemedText
              style={[styles.toggle, { color: "#6366f1" }]}
            >
              {expanded ? "Read less" : "Read more"}
            </ThemedText>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  image: { width: "100%", height: 180 },
  content: { padding: 16 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  description: { fontSize: 13, lineHeight: 19 },
  toggle: { marginTop: 10, fontSize: 13, fontWeight: "700" },
});
