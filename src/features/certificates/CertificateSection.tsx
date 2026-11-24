import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CertificateCard } from "./components/CertificateCard";
import { CertificateModal } from "./components/CertificateModal";
import { ImageViewer } from "./components/ImageViewer";
import { certificates as data, type Certificate } from "./data/certificates";

export function CertificateSection() {
  const theme = useTheme();
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerVisible, setViewerVisible] = useState(false);

  const openCertificate = (cert: Certificate) => {
    setSelected(cert);
    setModalVisible(true);
  };

  const openViewer = (images: string[], index: number) => {
    setViewerImages(images);
    setViewerIndex(index);
    setViewerVisible(true);
  };

  return (
    <View style={[styles.section, { backgroundColor: theme.background }]}>
      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(600)}
        style={styles.headerWrapper}
      >
        <ThemedText style={styles.heading}>Certificates</ThemedText>
        <View style={[styles.accentLine, { backgroundColor: "#6366f1" }]} />
      </Animated.View>

      {/* Grid 2 kolom — .map() tanpa VirtualizedList */}
      <View style={styles.grid}>
        {data.map((item, index) => (
          <View key={item.title} style={styles.gridItem}>
            <CertificateCard
              certificate={item}
              index={index}
              onPress={() => openCertificate(item)}
            />
          </View>
        ))}
      </View>

      {/* Modal detail */}
      <CertificateModal
        certificate={selected}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImagePress={openViewer}
      />

      {/* Fullscreen viewer */}
      <ImageViewer
        images={viewerImages}
        initialIndex={viewerIndex}
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: 40 },
  headerWrapper: { alignItems: "center", marginBottom: 24 },
  heading: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  accentLine: {
    marginTop: 10,
    width: 60,
    height: 4,
    borderRadius: 999,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  gridItem: {
    width: "48%",
  },
});
