import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useTheme } from "@/hooks/use-theme";
import { useVisitors } from "@/hooks/use-visitors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/* Pulse dot hijau */
function PulseDot({ color = "#10B981" }: { color?: string }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.75);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(2.4, { duration: 1500, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
    opacity.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
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

/* Sosmed list */
const SOCIALS = [
  {
    label: "Email",
    href: "mailto:marcosihombing72@gmail.com",
    icon: <Feather name="mail" size={18} />,
    bg: "#3B82F6",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6289664686245",
    icon: <FontAwesome5 name="whatsapp" size={18} />,
    bg: "#22C55E",
  },
  {
    label: "GitHub",
    href: "https://github.com/marco-sihombing",
    icon: <Feather name="github" size={18} />,
    bg: "#1F2937",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marcosihombing/",
    icon: <Feather name="linkedin" size={18} />,
    bg: "#1D4ED8",
  },
] as const;

export function Footer() {
  const theme = useTheme();
  const { isDesktop } = useBreakpoint();
  const visitors = useVisitors();

  const isDark = theme.background === "#000000";

  const gradient = isDark ? ["#111827", "#0B1220"] : ["#F9FAFB", "#F3F4F6"];

  return (
    <View style={{ backgroundColor: theme.background }}>
      <LinearGradient
        colors={gradient as [string, string]}
        style={[styles.footer, { borderTopColor: theme.backgroundSelected }]}
      >
        <View
          style={[
            styles.row,
            {
              flexDirection: isDesktop ? "row" : "column",
              alignItems: isDesktop ? "center" : "center",
              justifyContent: isDesktop ? "space-between" : "center",
              gap: 20,
            },
          ]}
        >
          {/* Brand & Copyright */}
          <View
            style={{
              alignItems: isDesktop ? "flex-start" : "center",
              gap: 2,
            }}
          >
            <Text style={[styles.brand, { color: theme.text }]}>
              Marco Sihombing
            </Text>
            <Text style={[styles.copy, { color: theme.textSecondary }]}>
              © {new Date().getFullYear()} All rights reserved.
            </Text>
          </View>

          {/* Visitor Counter */}
          {visitors !== null && (
            <View
              style={[
                styles.visitorBadge,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.backgroundSelected,
                },
              ]}
            >
              <PulseDot />
              <Text
                style={[styles.visitorLabel, { color: theme.textSecondary }]}
              >
                Visitors
              </Text>
              <Text style={[styles.visitorCount, { color: theme.text }]}>
                {visitors.toLocaleString()}
              </Text>
            </View>
          )}

          {/* Social Icons */}
          <View style={styles.socialRow}>
            {SOCIALS.map((s) => (
              <Pressable
                key={s.label}
                onPress={() => Linking.openURL(s.href)}
                style={({ pressed }) => [
                  styles.socialBtn,
                  {
                    backgroundColor: pressed ? s.bg : theme.backgroundElement,
                    borderColor: theme.backgroundSelected,
                    transform: [{ translateY: pressed ? -1 : 0 }],
                  },
                ]}
                aria-label={s.label}
                hitSlop={6}
              >
                {s.icon}
              </Pressable>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    width: "100%",
    maxWidth: 1152,
    alignSelf: "center",
  },
  brand: { fontSize: 15, fontWeight: "700" },
  copy: { fontSize: 11, marginTop: 2 },
  visitorBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  visitorLabel: { fontSize: 11 },
  visitorCount: { fontSize: 13, fontWeight: "700" },
  socialRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  socialBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
