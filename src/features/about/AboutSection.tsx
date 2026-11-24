import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Code, Brain, Rocket } from "lucide-react-native";

type AboutItemProps = {
  icon: React.ReactNode;
  iconBackground: string;
  iconColor: string;
  children: React.ReactNode;
  isMobile: boolean;
};

function AboutItem({
  icon,
  iconBackground,
  iconColor,
  children,
  isMobile,
}: AboutItemProps) {
  return (
    <View style={[styles.aboutItem, isMobile && styles.aboutItemMobile]}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        {icon}
      </View>

      <Text style={styles.paragraph}>{children}</Text>
    </View>
  );
}

export default function AboutSection() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const isMobile = width < 600;

  const colors = {
    card: isDark ? "#1f2937" : "#ffffff",
    text: isDark ? "#d1d5db" : "#374151",
    heading: isDark ? "#ffffff" : "#111827",
    border: isDark ? "#374151" : "#e5e7eb",
    highlight: isDark ? "#60a5fa" : "#2563eb",
  };

  return (
    <View style={styles.section}>
      {/* Background Glow */}
      <View style={styles.backgroundGlow}>
        <LinearGradient
          colors={
            isDark
              ? ["#1e3a8a55", "#6b21a855", "#83184333"]
              : ["#dbeafe88", "#f3e8ff77", "#fce7f388"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glow}
        />
      </View>

      {/* Main Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          isMobile && styles.cardMobile,
        ]}
      >
        {/* Title */}
        <Text
          style={[
            styles.heading,
            { color: colors.heading },
            isMobile && styles.headingMobile,
          ]}
        >
          About Me
        </Text>

        {/* Gradient Divider */}
        <View style={styles.divider}>
          <LinearGradient
            colors={["#3b82f6", "#8b5cf6"]}
            style={styles.dividerLine}
          />

          <LinearGradient
            colors={["#3b82f6", "#8b5cf6"]}
            style={styles.dividerDot}
          />

          <LinearGradient
            colors={["#8b5cf6", "#ec4899"]}
            style={styles.dividerLine}
          />
        </View>

        {/* About Content */}
        <View style={styles.content}>
          <AboutItem
            isMobile={isMobile}
            icon={<Code size={isMobile ? 17 : 20} color="#2563eb" />}
            iconBackground={isDark ? "#1e3a8a66" : "#dbeafe"}
            iconColor="#2563eb"
          >
            <Text style={{ color: colors.text }}>
              I am a{" "}
              <Text style={{ color: colors.highlight, fontWeight: "700" }}>
                Backend-Focused Full-Stack Developer
              </Text>{" "}
              with a primary focus on backend application development, database
              management, API development, and system performance optimization
              to build efficient, reliable, and scalable systems. I also have
              hands-on experience in frontend development using Next.js and
              TypeScript, allowing me to develop and integrate applications
              across the full stack while maintaining my primary focus on
              backend development.
            </Text>
          </AboutItem>

          <AboutItem
            isMobile={isMobile}
            icon={<Brain size={isMobile ? 17 : 20} color="#9333ea" />}
            iconBackground={isDark ? "#581c8766" : "#f3e8ff"}
            iconColor="#9333ea"
          >
            <Text style={{ color: colors.text }}>
              I am also interested in{" "}
              <Text style={{ color: colors.highlight, fontWeight: "700" }}>
                Machine Learning
              </Text>{" "}
              and{" "}
              <Text style={{ color: colors.highlight, fontWeight: "700" }}>
                Data Mining
              </Text>
              , which allows me to explore data processing and analytical
              approaches to gain valuable insights. I am always enthusiastic
              about learning new technologies and taking on challenges that help
              me improve my technical skills. With an analytical mindset and a
              problem-solving approach, I aim to contribute to development teams
              by building reliable and well-integrated applications.
            </Text>
          </AboutItem>

          <AboutItem
            isMobile={isMobile}
            icon={<Rocket size={isMobile ? 17 : 20} color="#db2777" />}
            iconBackground={isDark ? "#83184366" : "#fce7f3"}
            iconColor="#db2777"
          >
            <Text style={{ color: colors.text }}>
              I am always enthusiastic about learning new technologies and
              seeking challenges that can enhance my skills. With an analytical
              approach and innovative solutions, I am ready to contribute to the
              development team to create reliable and high-performance systems.
            </Text>
          </AboutItem>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 16,
    position: "relative",
    overflow: "hidden",
  },

  backgroundGlow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  glow: {
    width: "90%",
    height: "70%",
    borderRadius: 500,
    opacity: 0.8,
  },

  card: {
    width: "100%",
    maxWidth: 900,
    borderWidth: 1,
    borderRadius: 24,
    padding: 40,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
  },

  cardMobile: {
    padding: 20,
    borderRadius: 20,
  },

  heading: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
  },

  headingMobile: {
    fontSize: 26,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 24,
  },

  dividerLine: {
    width: 65,
    height: 4,
    borderRadius: 10,
  },

  dividerDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },

  content: {
    gap: 24,
  },

  aboutItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },

  aboutItemMobile: {
    gap: 10,
  },

  iconContainer: {
    padding: 8,
    borderRadius: 10,
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  paragraph: {
    flex: 1,
    fontSize: 17,
    lineHeight: 28,
  },
});
