import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { getAssetUrl } from "@/services/asset.service";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import type { Certificate } from "../data/certificates";

const { width: SCREEN_W } = Dimensions.get("window");

interface Props {
  certificate: Certificate | null;
  visible: boolean;
  onClose: () => void;
  onImagePress: (images: string[], index: number) => void;
}

export function CertificateModal({
  certificate,
  visible,
  onClose,
  onImagePress,
}: Props) {
  const theme = useTheme();
  if (!certificate) return null;

  const urls = certificate.images.map(getAssetUrl);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.sheet, { backgroundColor: theme.background }]}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle} numberOfLines={2}>
              {certificate.title}
            </ThemedText>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <X size={22} color={theme.text} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Carousel horizontal */}
            <FlatList
              data={urls}
              keyExtractor={(_, i) => String(i)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Pressable
                  style={{ width: SCREEN_W, paddingHorizontal: 16 }}
                  onPress={() => onImagePress(urls, index)}
                >
                  <Image
                    source={{ uri: item }}
                    style={styles.carouselImage}
                    contentFit="contain"
                    transition={200}
                  />
                </Pressable>
              )}
            />

            {/* Deskripsi */}
            <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
              <ThemedText
                style={{ color: theme.textSecondary, lineHeight: 20 }}
              >
                {certificate.description}
              </ThemedText>
              <ThemedText
                style={{
                  marginTop: 12,
                  color: theme.textSecondary,
                  fontSize: 12,
                }}
              >
                Tap gambar untuk memperbesar 🔍
              </ThemedText>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  sheet: {
    height: "90%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "700", marginRight: 12 },
  closeBtn: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  carouselImage: { width: "100%", height: 340, borderRadius: 16 },
});
