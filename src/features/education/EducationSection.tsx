import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Award, MapPin } from "lucide-react-native";

import { education } from "./data/education";

type EducationItem = (typeof education)[number];

type TimelineItemProps = {
  edu: EducationItem;
  isLeft: boolean;
  index: number;
  isMobile: boolean;
  isDark: boolean;
};

function TimelineItem({
  edu,
  isLeft,
  index,
  isMobile,
  isDark,
}: TimelineItemProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(isLeft ? -25 : 25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateX]);

  const accentColor = isLeft ? "#3B82F6" : "#A855F7";

  const cardBackground = isDark
    ? "rgba(31,41,55,0.94)"
    : "rgba(255,255,255,0.94)";

  const borderColor = isDark ? "rgba(75,85,99,0.5)" : "rgba(229,231,235,0.8)";

  const textColor = isDark ? "#F3F4F6" : "#111827";
  const secondaryColor = isDark ? "#9CA3AF" : "#4B5563";

  const alignment = isLeft && !isMobile ? "right" : "left";

  return (
    <View style={styles.timelineRow}>
      {/* Dot timeline */}
      <View
        style={[
          styles.timelineDot,
          isMobile ? styles.mobileDot : styles.desktopDot,
        ]}
      >
        <View style={[styles.dotInner, { backgroundColor: accentColor }]} />
      </View>

      {/* Animated education card */}
      <Animated.View
        style={[
          styles.cardWrapper,
          isMobile
            ? styles.mobileCardWrapper
            : isLeft
              ? styles.leftCardWrapper
              : styles.rightCardWrapper,
          {
            opacity,
            transform: [{ translateX }],
          },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: cardBackground,
              borderColor,
            },
          ]}
        >
          {/* School */}
          <Text
            style={[
              styles.school,
              {
                color: textColor,
                textAlign: alignment,
              },
            ]}
          >
            {edu.school}
          </Text>

          {/* Major */}
          <View
            style={[styles.infoRow, alignment === "right" && styles.rowReverse]}
          >
            <Award size={16} color={accentColor} />

            <Text
              style={[
                styles.major,
                {
                  color: accentColor,
                  textAlign: alignment,
                },
              ]}
            >
              {edu.major}
            </Text>
          </View>

          {/* Period */}
          <View
            style={[styles.infoRow, alignment === "right" && styles.rowReverse]}
          >
            <Calendar size={15} color={secondaryColor} />

            <Text
              style={[
                styles.period,
                {
                  color: secondaryColor,
                  textAlign: alignment,
                },
              ]}
            >
              {edu.period}
            </Text>
          </View>

          {/* Location */}
          {edu.location ? (
            <View
              style={[
                styles.infoRow,
                alignment === "right" && styles.rowReverse,
              ]}
            >
              <MapPin size={14} color={secondaryColor} />

              <Text
                style={[
                  styles.location,
                  {
                    color: secondaryColor,
                    textAlign: alignment,
                  },
                ]}
              >
                {edu.location}
              </Text>
            </View>
          ) : null}
        </View>
      </Animated.View>

      {/* Empty side for desktop alignment */}
      {!isMobile && <View style={styles.emptySide} />}
    </View>
  );
}

export default function EducationSection() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const isMobile = width < 768;
  const isDark = colorScheme === "dark";

  const backgroundColor = isDark ? "#111827" : "#F9FAFB";
  const titleColor = isDark ? "#F9FAFB" : "#111827";
  const subtitleColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <View
      nativeID="education"
      style={[
        styles.section,
        {
          backgroundColor,
          paddingHorizontal: isMobile ? 16 : 24,
        },
      ]}
    >
      {/* Background decoration */}
      <View pointerEvents="none" style={styles.backgroundDecoration}>
        <View
          style={[
            styles.glow,
            {
              backgroundColor: isDark
                ? "rgba(99,102,241,0.07)"
                : "rgba(99,102,241,0.04)",
            },
          ]}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: titleColor,
              fontSize: isMobile ? 24 : 32,
            },
          ]}
        >
          Educational Background
        </Text>

        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          My academic journey and qualifications
        </Text>
      </View>

      {/* Timeline */}
      <View style={styles.timelineContainer}>
        {/* Desktop center line */}
        {!isMobile && (
          <View style={styles.centerLineContainer}>
            <LinearGradient
              colors={["#3B82F6", "#A855F7", "#EC4899"]}
              style={styles.centerLine}
            />
          </View>
        )}

        {/* Mobile left line */}
        {isMobile && (
          <View style={styles.mobileLineContainer}>
            <LinearGradient
              colors={[
                "rgba(59,130,246,0.5)",
                "rgba(168,85,247,0.5)",
                "rgba(236,72,153,0.5)",
              ]}
              style={styles.mobileLine}
            />
          </View>
        )}

        {education.map((edu, index) => (
          <TimelineItem
            key={`${edu.school}-${edu.period}`}
            edu={edu}
            index={index}
            isLeft={index % 2 === 0}
            isMobile={isMobile}
            isDark={isDark}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    paddingTop: 56,
    paddingBottom: 64,
    overflow: "hidden",
    alignItems: "center",
  },

  backgroundDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  glow: {
    width: 500,
    height: 500,
    borderRadius: 250,
  },

  header: {
    width: "100%",
    maxWidth: 1100,
    alignItems: "center",
    marginBottom: 36,
  },

  title: {
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 10,
  },

  timelineContainer: {
    width: "100%",
    maxWidth: 1100,
    position: "relative",
  },

  centerLineContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 4,
    marginLeft: -2,
    overflow: "hidden",
    borderRadius: 10,
  },

  centerLine: {
    width: "100%",
    height: "100%",
  },

  mobileLineContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 13,
    width: 2,
    overflow: "hidden",
    borderRadius: 10,
  },

  mobileLine: {
    width: "100%",
    height: "100%",
  },

  timelineRow: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    minHeight: 100,
  },

  cardWrapper: {
    zIndex: 1,
  },

  mobileCardWrapper: {
    width: "100%",
    paddingLeft: 34,
  },

  leftCardWrapper: {
    width: "50%",
    paddingRight: 28,
    alignItems: "flex-end",
  },

  rightCardWrapper: {
    width: "50%",
    paddingLeft: 28,
    alignItems: "flex-start",
  },

  emptySide: {
    width: "50%",
  },

  timelineDot: {
    position: "absolute",
    zIndex: 2,
    borderRadius: 50,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileDot: {
    left: 7,
    width: 14,
    height: 14,
  },

  desktopDot: {
    left: "50%",
    width: 16,
    height: 16,
    marginLeft: -8,
  },

  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },

  card: {
    width: "100%",
    maxWidth: 480,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  school: {
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 23,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rowReverse: {
    flexDirection: "row-reverse",
  },

  major: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },

  period: {
    flexShrink: 1,
    fontSize: 13,
  },

  location: {
    flexShrink: 1,
    fontSize: 12,
  },
});
