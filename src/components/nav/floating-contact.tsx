import { LinearGradient } from "expo-linear-gradient";
import { Phone } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  onPress: () => void;
}

export function FloatingContact({ onPress }: Props) {
  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.fab,
          { transform: [{ scale: pressed ? 0.94 : 1 }] },
        ]}
      >
        <LinearGradient
          colors={["#3B82F6", "#9333EA"]}
          style={StyleSheet.absoluteFill}
        />
        <Phone size={22} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 96, // di atas bottom nav
    right: 20,
    zIndex: 50,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});
