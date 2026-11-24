import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Sparkles } from "lucide-react-native";

import { skills } from "./data/skills";
import SkillCard from "./components/SkillCard";

export default function SkillsSection() {
  const { width } = useWindowDimensions();
  const isDark = useColorScheme() === "dark";

  const translateX = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);

  const gap = width < 600 ? 12 : 24;

  useEffect(() => {
    if (trackWidth <= 0 || skills.length === 0) return;

    translateX.setValue(0);

    const halfWidth = trackWidth / 2;

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -halfWidth,
        duration: 25000,
        useNativeDriver: true,
        isInteraction: false,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
      translateX.stopAnimation();
    };
  }, [trackWidth, translateX]);

  const backgroundColor = isDark ? "#111827" : "#F9FAFB";
  const titleColor = isDark ? "#F9FAFB" : "#111827";
  const subtitleColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <View nativeID="skills" style={[styles.section, { backgroundColor }]}>
      {/* Background decoration */}
      <View pointerEvents="none" style={styles.decoration}>
        <View
          style={[
            styles.glow,
            {
              backgroundColor: isDark
                ? "rgba(59,130,246,0.07)"
                : "rgba(59,130,246,0.05)",
            },
          ]}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: titleColor }]}>Tech Stack</Text>

        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          Technologies and tools I work with
        </Text>
      </View>

      {/* Autoplay marquee */}
      <View style={styles.sliderViewport}>
        <Animated.View
          style={[
            styles.sliderTrack,
            {
              transform: [{ translateX }],
            },
          ]}
          onLayout={(event) => {
            const measuredWidth = event.nativeEvent.layout.width;

            if (measuredWidth > 0) {
              setTrackWidth(measuredWidth);
            }
          }}
        >
          {[0, 1].map((copy) => (
            <View
              key={`skill-group-${copy}`}
              style={[styles.skillGroup, { gap }]}
            >
              {skills.map((skill, index) => (
                <SkillCard
                  key={`${copy}-${skill.name}-${index}`}
                  name={skill.name}
                  icon={skill.icon}
                  iconColor={skill.color}
                />
              ))}
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Skills counter */}
      <View style={styles.counter}>
        <View style={styles.counterItem}>
          <Sparkles size={16} color="#3B82F6" />

          <Text style={[styles.counterText, { color: subtitleColor }]}>
            {skills.length} Technologies
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: isDark ? "#4B5563" : "#D1D5DB" },
          ]}
        />

        <View style={styles.counterItem}>
          <View style={styles.statusDot} />

          <Text style={[styles.counterText, { color: subtitleColor }]}>
            Always Learning
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    paddingTop: 64,
    paddingBottom: 56,
    overflow: "hidden",
  },

  decoration: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },

  glow: {
    width: 500,
    height: 500,
    borderRadius: 250,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },

  sliderViewport: {
    width: "100%",
    overflow: "hidden",
    paddingVertical: 12,
  },

  sliderTrack: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },

  skillGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  counter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 28,
    paddingHorizontal: 12,
    flexWrap: "wrap",
  },

  counterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  counterText: {
    fontSize: 13,
  },

  divider: {
    width: 1,
    height: 16,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "#22C55E",
  },
});
