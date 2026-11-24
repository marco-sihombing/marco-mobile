import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Carousel } from "react-native-reanimated-carousel";
import { ExperienceCard } from "./components/ExperienceCard";
import { experiences } from "./data/experiences";

const { width: SCREEN_W } = Dimensions.get("window");
const ACCENT_COLOR = "#6366f1";

export function ExperienceSection() {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // Ukuran kartu
  const CARD_WIDTH = SCREEN_W - 64; // padding kiri-kanan 32
  const GAP = 16;

  const onSnapToItem = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <View style={[styles.section, { backgroundColor: theme.background }]}>
      {/* Title */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <ThemedText style={styles.heading}>Experience</ThemedText>
        <View style={[styles.accentLine, { backgroundColor: ACCENT_COLOR }]} />
      </Animated.View>

      {/* Carousel */}
      <Carousel
        loop
        autoplay
        autoplayInterval={4500}
        style={{ width: SCREEN_W, height: 420 }}
        data={experiences}
        onSnapToItem={onSnapToItem}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: CARD_WIDTH,
              marginLeft: (SCREEN_W - CARD_WIDTH) / 2,
            }}
          >
            <ExperienceCard experience={item} index={index} />
          </View>
        )}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {experiences.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor:
                  i === activeIndex ? ACCENT_COLOR : "rgba(120,120,120,0.3)",
                width: i === activeIndex ? 22 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: 40 },
  header: { alignItems: "center", marginBottom: 24 },
  heading: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  accentLine: { marginTop: 10, width: 64, height: 4, borderRadius: 999 },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
});
