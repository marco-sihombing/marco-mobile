import { useTheme } from "@/hooks/use-theme";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const DOUBLE_TAP_SCALE = 2.5;

interface Props {
  images: string[]; // sudah resolved URL
  initialIndex?: number;
  visible: boolean;
  onClose: () => void;
}

export function ImageViewer({
  images,
  initialIndex = 0,
  visible,
  onClose,
}: Props) {
  const theme = useTheme();
  const [index, setIndex] = useState(initialIndex);

  // 🔑 Shared values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const savedTx = useSharedValue(0);
  const savedTy = useSharedValue(0);
  const isZoomed = useSharedValue(false);

  // Reset ketika modal dibuka / index berubah
  useEffect(() => {
    if (!visible) return;
    scale.value = 1;
    savedScale.value = 1;
    tx.value = 0;
    ty.value = 0;
    savedTx.value = 0;
    savedTy.value = 0;
    isZoomed.value = false;
    setIndex(initialIndex);
  }, [visible, initialIndex]);

  const resetZoom = useCallback(() => {
    "worklet";
    scale.value = withTiming(1);
    savedScale.value = 1;
    tx.value = withTiming(0);
    ty.value = withTiming(0);
    savedTx.value = 0;
    savedTy.value = 0;
    isZoomed.value = false;
  }, []);

  // 🔍 PINCH
  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      const next = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(next, MIN_SCALE * 0.8), MAX_SCALE);
    })
    .onEnd(() => {
      if (scale.value < MIN_SCALE) {
        resetZoom();
      } else {
        savedScale.value = scale.value;
        isZoomed.value = scale.value > 1.05;
      }
    });

  // ✋ PAN (hanya aktif saat zoom > 1)
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        tx.value = savedTx.value + e.translationX;
        ty.value = savedTy.value + e.translationY;
      }
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        tx.value = withTiming(0);
        ty.value = withTiming(0);
        savedTx.value = 0;
        savedTy.value = 0;
      } else {
        savedTx.value = tx.value;
        savedTy.value = ty.value;
      }
    });

  // 👆 DOUBLE TAP → zoom in / out
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((e) => {
      if (scale.value > 1.05) {
        // zoom out
        scale.value = withTiming(1, { duration: 250 });
        savedScale.value = 1;
        tx.value = withTiming(0);
        ty.value = withTiming(0);
        savedTx.value = 0;
        savedTy.value = 0;
        isZoomed.value = false;
      } else {
        // zoom in, fokus ke titik tap
        const focusX = e.x - SCREEN_W / 2;
        const focusY = e.y - SCREEN_H / 2;
        scale.value = withTiming(DOUBLE_TAP_SCALE, { duration: 250 });
        savedScale.value = DOUBLE_TAP_SCALE;
        tx.value = withTiming(-focusX * (DOUBLE_TAP_SCALE - 1));
        ty.value = withTiming(-focusY * (DOUBLE_TAP_SCALE - 1));
        savedTx.value = -focusX * (DOUBLE_TAP_SCALE - 1);
        savedTy.value = -focusY * (DOUBLE_TAP_SCALE - 1);
        isZoomed.value = true;
      }
    });

  // ↔️ SWIPE untuk pindah gambar (hanya saat tidak zoom)
  const swipe = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onEnd((e) => {
      if (isZoomed.value) return;
      if (e.translationX < -60 && index < images.length - 1) {
        runOnJS(goNext)();
      } else if (e.translationX > 60 && index > 0) {
        runOnJS(goPrev)();
      }
    });

  const goNext = () => {
    resetZoom();
    setIndex((i) => Math.min(i + 1, images.length - 1));
  };
  const goPrev = () => {
    resetZoom();
    setIndex((i) => Math.max(i - 1, 0));
  };

  // Gabungkan gesture
  const composed = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, swipe),
    pinch,
    pan,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.backdrop}>
          {/* Close */}
          <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={12}>
            <X color="#fff" size={26} />
          </Pressable>

          {/* Counter */}
          {images.length > 1 && (
            <View style={styles.counterBox}>
              <Text style={styles.counterText}>
                {index + 1} / {images.length}
              </Text>
            </View>
          )}

          {/* Zoomable image */}
          <GestureDetector gesture={composed}>
            <Animated.View style={[styles.imageWrapper, animatedStyle]}>
              <Image
                source={{ uri: images[index] }}
                style={styles.image}
                contentFit="contain"
                transition={150}
              />
            </Animated.View>
          </GestureDetector>

          {/* Hint */}
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>
              Double-tap / pinch untuk zoom • Swipe untuk ganti
            </Text>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.96)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: SCREEN_W,
    height: SCREEN_H * 0.75,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  counterBox: {
    position: "absolute",
    top: 56,
    left: 20,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  counterText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  hintBox: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  hintText: { color: "rgba(255,255,255,0.85)", fontSize: 12 },
});
