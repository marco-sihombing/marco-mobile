import AboutSection from "@/features/about/AboutSection";
import { HeroSection } from "@/features/hero/HeroSection";
import ContactSection from "@/features/contact/ContactSection";
import EducationSection from "@/features/education/EducationSection";
import SkillsSection from "@/features/skills/SkillsSection";
import WelcomePopup from "@/features/welcome/WelcomePopup";
import { Footer } from "@/features/footer/Footer";
import { CertificateSection } from "@/features/certificates/CertificateSection";
import { ExperienceSection } from "@/features/experience/ExperienceSection";
import { ProjectSection } from "@/features/projects/ProjectSection";
import { BottomNav } from "@/components/nav/bottom-nav";
import { FloatingContact } from "@/components/nav/floating-contact";
import { TopHeader } from "@/components/nav/top-header";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useTheme } from "@/hooks/use-theme";
import { useRef } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  ScrollViewInstance,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const { isDesktop } = useBreakpoint();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const offsets = useRef<Record<string, number>>({});

  const onLayoutSection = (id: string) => (e: LayoutChangeEvent) => {
    offsets.current[id] = e.nativeEvent.layout.y;
  };

  const navigateTo = (id: string) => {
    const y = offsets.current[id] ?? 0;
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background }}
      edges={["top"]}
    >
      {/* Welcome popup — sama seperti web */}
      <WelcomePopup
        message="Welcome"
        description="Let's connect and explore what we can build together."
        autoClose={5000}
      />

      {/* Top header — hanya di >= 768 (sama seperti md:) */}
      {isDesktop && <TopHeader onNavigate={navigateTo} />}

      {/* Konten utama — pengganti <main> + <ScrollView> */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View onLayout={onLayoutSection("hero")}>
          <HeroSection />
        </View>
        <View onLayout={onLayoutSection("about")}>
          <AboutSection />
        </View>
        <View onLayout={onLayoutSection("skills")}>
          <SkillsSection />
        </View>
        <View onLayout={onLayoutSection("education")}>
          <EducationSection />
        </View>
        <View onLayout={onLayoutSection("experience")}>
          <ExperienceSection />
        </View>
        <View onLayout={onLayoutSection("projects")}>
          <ProjectSection />
        </View>
        <View onLayout={onLayoutSection("certificates")}>
          <CertificateSection />
        </View>
        <View onLayout={onLayoutSection("contact")}>
          <ContactSection />
        </View>
        <Footer />
      </ScrollView>

      {/* Floating contact — selalu ada (sama seperti web) */}
      <FloatingContact onPress={() => navigateTo("contact")} />

      {/* Bottom nav — hanya di < 768 (sama seperti md:hidden) */}
      {!isDesktop && <BottomNav onNavigate={navigateTo} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 100 }, // ruang untuk bottom nav + FAB
});
