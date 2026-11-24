import { useWindowDimensions } from "react-native";

export function useBreakpoint() {
  const { width, height } = useWindowDimensions();
  return {
    width,
    height,
    isMobile: width < 768, // sama dengan Tailwind `md:`
    isDesktop: width >= 768,
  };
}
