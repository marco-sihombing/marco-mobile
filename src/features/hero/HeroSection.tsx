import { ThemedText } from "@/components/themed-text";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useTheme } from "@/hooks/use-theme";
import { getAssetUrl } from "@/services/asset.service";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { ArrowDown } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated as RNAnimated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/* ===============================
   Hook typing effect (mirip TypeAnimation)
   =============================== */
function useTypewriter(phrases: string[], speed = 50, holdMs = 2000) {
  const [text, setText] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setText(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
      } else {
        charIdx.current--;
        setText(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

/* ===============================
   Pulse dot "Open to Opportunities"
   =============================== */
function PulseDot({ color }: { color: string }) {
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.75);

  useEffect(() => {
    ringScale.value = withRepeat(
      withTiming(2.4, { duration: 1500, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
    ringOpacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <View
      style={{
        width: 8,
        height: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: color,
          },
          ringStyle,
        ]}
      />
      <View
        style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }}
      />
    </View>
  );
}

/* ===============================
   Bounce scroll-down arrow
   =============================== */
function BounceArrow({
  color,
  onPress,
}: {
  color: string;
  onPress?: () => void;
}) {
  const translateY = useSharedValue(0);
  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(6, { duration: 800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, []);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Pressable onPress={onPress}>
      <Animated.View style={style}>
        <ArrowDown color={color} size={20} />
      </Animated.View>
    </Pressable>
  );
}

/* ===============================
   Hero Section
   =============================== */
interface HeroSectionProps {
  onScrollDown?: () => void;
}

export function HeroSection({ onScrollDown }: HeroSectionProps) {
  const theme = useTheme();
  const { isDesktop } = useBreakpoint();

  const typed = useTypewriter(
    [
      "Backend Developer",
      "Optimizing Systems & Databases",
      "Learning Machine Learning & Data Mining",
      "Open to New Tech",
      "Team & Solo Work",
      "Punctual & Detail-Oriented",
    ],
    50,
    2000,
  );

  const socials = [
    {
      id: "mail",
      icon: "mail" as const,
      url: "mailto:marcosihombing72@gmail.com",
    },
    {
      id: "github",
      icon: "github" as const,
      url: "https://github.com/marco-sihombing",
    },
    {
      id: "linkedin",
      icon: "linkedin" as const,
      url: "https://www.linkedin.com/in/marcosihombing/",
    },
    {
      id: "wa",
      icon: "message-circle" as const, // Feather tidak punya WA, pakai msg-circle
      url: "https://wa.me/6289664686245",
    },
  ];

  return (
    <View style={[styles.hero, { backgroundColor: theme.background }]}>
      {/* Background gradient */}
      <LinearGradient
        colors={
          theme.background === "#000000" // dark
            ? ["rgba(17,24,39,1)", "rgba(31,41,55,0.9)", "transparent"]
            : ["rgba(239,246,255,1)", "rgba(255,255,255,0.9)", "transparent"]
        }
        start={{ x: 0, y: 0 }}
        end={isDesktop ? { x: 1, y: 0 } : { x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.content,
          {
            flexDirection: isDesktop ? "row" : "column",
            gap: isDesktop ? 48 : 24,
            paddingTop: isDesktop ? 40 : 48,
          },
        ]}
      >
        {/* ============ Text Side ============ */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(700)}
          style={[
            styles.textSide,
            { alignItems: isDesktop ? "flex-start" : "center" },
          ]}
        >
          {/* Badge */}
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  theme.background === "#000000"
                    ? "rgba(30,58,138,0.25)"
                    : "rgba(219,234,254,1)",
                borderColor:
                  theme.background === "#000000"
                    ? "rgba(30,64,175,0.6)"
                    : "rgba(191,219,254,1)",
              },
            ]}
          >
            <PulseDot color="#3B82F6" />
            <Text
              style={[
                styles.badgeText,
                {
                  color: theme.background === "#000000" ? "#93C5FD" : "#1D4ED8",
                },
              ]}
            >
              Open to Opportunities
            </Text>
          </View>

          {/* Nama */}
          <ThemedText
            style={[
              styles.name,
              {
                fontSize: isDesktop ? 56 : 36,
                textAlign: isDesktop ? "left" : "center",
              },
            ]}
          >
            Marco{" "}
            <Text style={{ color: "#3B82F6" }}>Sihombing</Text>
          </ThemedText>

          {/* Underline gradient di bawah nama */}
          <LinearGradient
            colors={["#3B82F6", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nameUnderline}
          />

          {/* Subtitle */}
          <View
            style={[
              styles.subtitleBox,
              {
                backgroundColor:
                  theme.background === "#000000"
                    ? "rgba(55,65,81,0.35)"
                    : "rgba(243,244,246,0.6)",
                borderColor:
                  theme.background === "#000000"
                    ? "rgba(75,85,99,0.5)"
                    : "rgba(229,231,235,0.6)",
              },
            ]}
          >
            <ThemedText style={[styles.subtitle, { color: theme.text }]}>
              Software Engineer | Backend-Focused
            </ThemedText>
          </View>

          {/* Typing */}
          <View style={styles.typingRow}>
            <Text
              style={[styles.typingText, { color: "#3B82F6" }]}
            >
              {typed}
              <Text style={{ color: "#3B82F6" }}>|</Text>
            </Text>
          </View>

          {/* Social icons */}
          <View style={styles.socialRow}>
            {socials.map((s) => (
              <Pressable
                key={s.id}
                onPress={() => Linking.openURL(s.url)}
                style={({ pressed }) => [
                  styles.socialBtn,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                hitSlop={10}
              >
                <Feather name={s.icon} size={22} color={theme.textSecondary} />
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* ============ Image Side ============ */}
        <Animated.View
          entering={FadeIn.delay(250).duration(900)}
          style={[styles.imageSide, { marginTop: isDesktop ? -16 : 8 }]}
        >
          <View style={styles.imageWrap}>
            {/* Glow */}
            <View style={styles.glow} />
            <Image
              source={{ uri: getAssetUrl("/photo1.png") }}
              style={[
                styles.avatar,
                {
                  width: isDesktop ? 260 : 180,
                  height: isDesktop ? 260 : 180,
                  borderColor:
                    theme.background === "#000000"
                      ? "rgba(55,65,81,1)"
                      : "rgba(229,231,235,1)",
                },
              ]}
              contentFit="cover"
              transition={300}
            />
          </View>
        </Animated.View>
      </View>

      {/* Scroll Down */}
      <Animated.View
        entering={FadeIn.delay(1200).duration(700)}
        style={styles.scrollDown}
      >
        <Pressable
          onPress={onScrollDown}
          style={{ alignItems: "center", gap: 4 }}
        >
          <ThemedText
            style={[styles.scrollText, { color: theme.textSecondary }]}
          >
            Scroll Down
          </ThemedText>
          <BounceArrow color={theme.textSecondary} onPress={onScrollDown} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 640,
    justifyContent: "center",
    overflow: "hidden",
    paddingBottom: 60,
  },
  content: {
    width: "100%",
    maxWidth: 1152,
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  textSide: {
    flex: 1,
    gap: 14,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: "600" },
  name: { fontWeight: "900", letterSpacing: -1, lineHeight: undefined },
  nameUnderline: {
    height: 4,
    width: 96,
    borderRadius: 999,
    marginTop: -6,
    marginBottom: 4,
  },
  subtitleBox: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  subtitle: { fontSize: 14, fontWeight: "600" },
  typingRow: { minHeight: 26, paddingVertical: 4 },
  typingText: { fontSize: 15, fontWeight: "700" },
  socialRow: {
    flexDirection: "row",
    gap: 18,
    marginTop: 8,
    alignItems: "center",
  },
  socialBtn: { padding: 4 },
  imageSide: { alignItems: "center", justifyContent: "center" },
  imageWrap: { alignItems: "center", justifyContent: "center" },
  glow: {
    position: "absolute",
    width: "120%",
    height: "120%",
    borderRadius: 999,
    backgroundColor: "rgba(59,130,246,0.22)",
  },
  avatar: {
    borderRadius: 999,
    borderWidth: 4,
    backgroundColor: "#ccc",
  },
  scrollDown: {
    position: "absolute",
    bottom: 18,
    alignSelf: "center",
    alignItems: "center",
  },
  scrollText: { fontSize: 12, fontWeight: "600" },
});
