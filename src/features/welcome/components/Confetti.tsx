import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const COLORS = [
  "#F87171",
  "#FACC15",
  "#34D399",
  "#60A5FA",
  "#A78BFA",
  "#FB923C",
  "#F472B6",
];

type Particle = {
  id: number;
  color: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
};

type ConfettiProps = {
  width: number;
  height: number;
};

export default function Confetti({ width, height }: ConfettiProps) {
  const particles = useRef<Particle[]>(
    Array.from({ length: 30 }, (_, index) => ({
      id: index,
      color: COLORS[index % COLORS.length],
      size: Math.random() * 8 + 4,
      x: (Math.random() - 0.5) * Math.min(width * 0.7, 250),
      y: (Math.random() - 0.5) * Math.min(height * 0.6, 250),
      rotation: Math.random() * 720,
      delay: 300 + Math.random() * 200,
    })),
  ).current;

  const progress = useRef(particles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = progress.map((value, index) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 1800 + Math.random() * 500,
        delay: particles[index].delay,
        useNativeDriver: true,
      }),
    );

    const animation = Animated.parallel(animations);
    animation.start();

    return () => animation.stop();
  }, [particles, progress]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {particles.map((particle, index) => {
        const value = progress[index];

        const translateX = value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.x],
        });

        const translateY = value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.y],
        });

        const opacity = value.interpolate({
          inputRange: [0, 0.65, 1],
          outputRange: [1, 0.8, 0],
        });

        const scale = value.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });

        const rotate = value.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${particle.rotation}deg`],
        });

        return (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                width: particle.size,
                height: particle.size,
                borderRadius: particle.size,
                backgroundColor: particle.color,
                left: width / 2,
                top: height / 2,
                opacity,
                transform: [
                  { translateX },
                  { translateY },
                  { scale },
                  { rotate },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
});
