import { useTheme } from "@/hooks/use-theme";
import { Feather } from "@expo/vector-icons";
import { getAssetUrl } from "@/services/asset.service";
import * as Linking from "expo-linking";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ITEMS = [
  { id: "about", icon: "home", label: "Home" },
  { id: "skills", icon: "code", label: "Skill" },
  { id: "education", icon: "book", label: "Edu" },
  { id: "projects", icon: "folder", label: "Proj" },
  { id: "certificates", icon: "award", label: "Cert" },
  { id: "experience", icon: "briefcase", label: "Exp" },
  { id: "contact", icon: "mail", label: "Contact" },
] as const;

interface Props {
  onNavigate: (id: string) => void;
}

export function BottomNav({ onNavigate }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: theme.backgroundElement,
          borderTopColor: theme.backgroundSelected,
        },
      ]}
    >
      {ITEMS.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => onNavigate(item.id)}
          style={styles.item}
        >
          <Feather
            name={item.icon as any}
            size={18}
            color={theme.textSecondary}
          />
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {item.label}
          </Text>
        </Pressable>
      ))}

      {/* CV */}
      <Pressable
        onPress={() => Linking.openURL(getAssetUrl("pdf/Marco-Sihombing.pdf"))}
        style={styles.item}
      >
        <Feather name="download" size={18} color={theme.textSecondary} />
        <Text style={[styles.label, { color: theme.textSecondary }]}>CV</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 3,
  },
  label: { fontSize: 10, fontWeight: "600" },
});
