import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { getAssetUrl } from "@/services/asset.service";
import type { Certificate } from "../data/certificates";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  certificate: Certificate;
  index: number;
  onPress: () => void;
}

export function CertificateCard({ certificate, index, onPress }: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 120)
        .springify()
        .damping(18)}
      style={animatedStyle}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(0.97))}
        onPressOut={() => (scale.value = withSpring(1))}
        style={styles.pressable}
      >
        <ThemedView
          style={[
            styles.card,
            {
              borderColor: theme.backgroundElement,
              backgroundColor: theme.background,
            },
          ]}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: getAssetUrl(certificate.images[0]) }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
            {certificate.images.length > 1 && (
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>
                  {certificate.images.length} 📷
                </ThemedText>
              </View>
            )}
          </View>

          <View style={styles.content}>
            <ThemedText style={styles.title} numberOfLines={2}>
              {certificate.title}
            </ThemedText>
            <ThemedText
              style={[styles.description, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {certificate.description}
            </ThemedText>
          </View>
        </ThemedView>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressable: { width: "100%" },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  imageWrapper: { position: "relative", width: "100%", height: 180 },
  image: { width: "100%", height: "100%" },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  content: { padding: 14 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  description: { fontSize: 13, lineHeight: 18 },
});
