import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type WelcomeProgressBarProps = {
  duration: number;
};

export default function WelcomeProgressBar({
  duration,
}: WelcomeProgressBarProps) {
  const progress = useRef(new Animated.Value(1)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (duration <= 0 || containerWidth <= 0) return;

    progress.setValue(1);

    const animation = Animated.timing(progress, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    });

    animation.start();

    return () => animation.stop();
  }, [duration, containerWidth, progress]);

  const animatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth],
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      <Animated.View style={[styles.progress, { width: animatedWidth }]}>
        <LinearGradient
          colors={["#3B82F6", "#A855F7", "#EC4899"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  progress: {
    height: "100%",
    overflow: "hidden",
  },
});
