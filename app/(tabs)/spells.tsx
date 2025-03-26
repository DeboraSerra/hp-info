import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHouse } from "@/hooks/useHouse";
import mapHouseLogo from "@/utils/images";
import { HouseType } from "@/utils/interfaces";

export default function TabTwoScreen() {
  const { house } = useHouse();
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={mapHouseLogo[house as HouseType]}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Spells</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: "absolute",
    width: 200,
    height: 200,
    bottom: -40,
    left: -40,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
