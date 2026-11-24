import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { GithubCard } from "./components/GithubCard";
import { ProjectCard } from "./components/ProjectCard";
import { projects, type Project } from "./data/projects";

export function ProjectSection() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const numColumns = width >= 768 ? 2 : 1;

  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) =>
    setExpanded((prev) => (prev === index ? null : index));

  type Item =
    | { type: "project"; project: Project; index: number }
    | { type: "github"; index: number };

  const data: Item[] = [
    ...projects.map((project, index) => ({
      type: "project" as const,
      project,
      index,
    })),
    { type: "github" as const, index: projects.length },
  ];

  return (
    <View style={[styles.section, { backgroundColor: theme.background }]}>
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <ThemedText style={styles.heading}>Projects</ThemedText>
        <View style={[styles.accentLine, { backgroundColor: "#6366f1" }]} />
      </Animated.View>

      {/* Grid via .map() — tanpa VirtualizedList */}
      <View style={[styles.grid, { paddingHorizontal: 16, gap: 16 }]}>
        {data.map((item) => {
          const itemStyle =
            numColumns > 1
              ? { width: "48%" as const }
              : { width: "100%" as const };

          if (item.type === "project") {
            return (
              <View key={item.project.title} style={itemStyle}>
                <ProjectCard
                  project={item.project}
                  index={item.index}
                  expanded={expanded === item.index}
                  onToggleExpand={() => toggleExpand(item.index)}
                />
              </View>
            );
          }
          return (
            <View key={`gh-${item.index}`} style={itemStyle}>
              <GithubCard index={item.index} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: 40 },
  header: { alignItems: "center", marginBottom: 24 },
  heading: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  accentLine: { marginTop: 10, width: 64, height: 4, borderRadius: 999 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 32,
  },
});
