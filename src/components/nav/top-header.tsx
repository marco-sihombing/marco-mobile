import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { getAssetUrl } from "@/services/asset.service";
import * as Linking from "expo-linking";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skill" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Project" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Work & Internship" },
  { id: "contact", label: "Contact" },
];

interface Props {
  onNavigate: (id: string) => void;
}

export function TopHeader({ onNavigate }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      {/* Logo */}
      <Text style={styles.logo}>Marco Sihombing</Text>

      {/* Nav links */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", gap: 24 }}
      >
        {NAV_ITEMS.map((item) => (
          <Pressable key={item.id} onPress={() => onNavigate(item.id)}>
            <Text style={[styles.link, { color: theme.text }]}>
              {item.label}
            </Text>
          </Pressable>
        ))}

        {/* Tombol CV */}
        <Pressable
          onPress={() =>
            Linking.openURL(getAssetUrl("pdf/Marco-Sihombing.pdf"))
          }
        >
          <LinearGradient
            colors={["#3B82F6", "#9333EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cvBtn}
          >
            <Text style={styles.cvText}>Download CV</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 18,
    gap: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  logo: {
    fontSize: 20,
    fontWeight: "900",
    color: "#3B82F6",
  },
  link: { fontSize: 14, fontWeight: "600" },
  cvBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cvText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
