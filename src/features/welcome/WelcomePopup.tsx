import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";

import { X, Sparkles, Hand } from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";

import Confetti from "./components/Confetti";
import WelcomeProgressBar from "./components/WelcomeProgressBar";

type WelcomePopupProps = {
  message?: string;
  description?: string;
  autoClose?: number;
};

export default function WelcomePopup({
  message = "Welcome",
  description = "Let's connect and explore what we can build together.",
  autoClose = 5000,
}: WelcomePopupProps) {
  const [visible, setVisible] = useState(true);

  const { width, height } = useWindowDimensions();
  const isMobile = width < 640;
  const isDark = useColorScheme() === "dark";

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const iconScale = useRef(new Animated.Value(0)).current;
  const iconRotate = useRef(new Animated.Value(-180)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  const closePopup = () => {
    setVisible(false);
  };

  // Modal entrance animation
  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        damping: 20,
        stiffness: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 20,
        stiffness: 300,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(200),
        Animated.spring(iconScale, {
          toValue: 1,
          damping: 15,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(iconRotate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    visible,
    opacity,
    scale,
    translateY,
    iconScale,
    iconRotate,
    titleOpacity,
  ]);

  // Auto close
  useEffect(() => {
    if (!visible || autoClose <= 0) return;

    const timer = setTimeout(() => {
      closePopup();
    }, autoClose);

    return () => clearTimeout(timer);
  }, [visible, autoClose]);

  if (!visible) return null;

  const backgroundColor = isDark ? "#1F2937" : "#FFFFFF";
  const titleColor = isDark ? "#F9FAFB" : "#1F2937";
  const descriptionColor = isDark ? "#D1D5DB" : "#4B5563";

  const iconRotation = iconRotate.interpolate({
    inputRange: [-180, 0],
    outputRange: ["-180deg", "0deg"],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closePopup}
    >
      <View style={styles.overlay}>
        {/* Background overlay */}
        <Pressable style={StyleSheet.absoluteFill} onPress={closePopup} />

        {/* Popup card */}
        <Animated.View
          style={[
            styles.modalCard,
            {
              width: Math.min(width - 32, 480),
              backgroundColor,
              opacity,
              transform: [{ scale }, { translateY }],
            },
          ]}
        >
          {/* Background decoration */}
          <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <View
              style={[
                styles.glow,
                styles.topGlow,
                { backgroundColor: "rgba(59,130,246,0.10)" },
              ]}
            />
            <View
              style={[
                styles.glow,
                styles.bottomGlow,
                { backgroundColor: "rgba(236,72,153,0.10)" },
              ]}
            />
          </View>

          {/* Close button */}
          <Pressable
            onPress={closePopup}
            accessibilityRole="button"
            accessibilityLabel="Close welcome popup"
            style={({ pressed }) => [
              styles.closeButton,
              {
                backgroundColor: isDark ? "#374151" : "#F3F4F6",
                opacity: pressed ? 0.65 : 1,
              },
            ]}
          >
            <X size={20} color={isDark ? "#E5E7EB" : "#4B5563"} />
          </Pressable>

          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Animated.View
              style={{
                transform: [{ scale: iconScale }, { rotate: iconRotation }],
              }}
            >
              <LinearGradient
                colors={["#3B82F6", "#A855F7"]}
                style={styles.iconContainer}
              >
                <Hand size={isMobile ? 36 : 42} color="#FFFFFF" />
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Title */}
          <Animated.Text
            style={[
              styles.title,
              {
                color: titleColor,
                fontSize: isMobile ? 28 : 36,
                opacity: titleOpacity,
              },
            ]}
          >
            {message}
          </Animated.Text>

          {/* Description */}
          <View style={styles.descriptionWrapper}>
            <Sparkles size={17} color="#EAB308" />

            <Text style={[styles.description, { color: descriptionColor }]}>
              {description}
            </Text>

            <Sparkles size={17} color="#EAB308" />
          </View>

          {/* Decorative emoji */}
          <Text style={styles.partyLeft}>🎉</Text>
          <Text style={styles.sparkleLeft}>✨</Text>
          <Text style={styles.partyRight}>🎊</Text>

          {/* Close hint */}
          <Text
            style={[styles.hint, { color: isDark ? "#6B7280" : "#9CA3AF" }]}
          >
            Click outside or press ✕ to close
          </Text>

          {/* Progress bar */}
          {autoClose > 0 && <WelcomeProgressBar duration={autoClose} />}

          {/* Confetti */}
          <Confetti width={Math.min(width - 32, 480)} height={380} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  modalCard: {
    maxWidth: 480,
    minHeight: 340,
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 32,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(156,163,175,0.25)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },

  glow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
  },

  topGlow: {
    top: -120,
    right: -90,
  },

  bottomGlow: {
    bottom: -120,
    left: -90,
  },

  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 5,
    width: 36,
    height: 36,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    marginBottom: 20,
  },

  iconContainer: {
    width: 76,
    height: 76,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },

  title: {
    fontWeight: "900",
    textAlign: "center",
    zIndex: 2,
  },

  descriptionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 4,
    zIndex: 2,
  },

  description: {
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },

  partyLeft: {
    position: "absolute",
    bottom: 30,
    left: 18,
    fontSize: 24,
    opacity: 0.2,
  },

  sparkleLeft: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 20,
    opacity: 0.2,
  },

  partyRight: {
    position: "absolute",
    bottom: 30,
    right: 18,
    fontSize: 20,
    opacity: 0.2,
  },

  hint: {
    marginTop: 30,
    fontSize: 10,
    zIndex: 2,
  },
});
