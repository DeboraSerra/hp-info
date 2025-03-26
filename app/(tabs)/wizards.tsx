import { Image, StyleSheet, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHouse } from "@/hooks/useHouse";
import api from "@/utils/api";
import mapHouseLogo from "@/utils/images";
import { HouseType, IWizard } from "@/utils/interfaces";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [data, setData] = useState<IWizard[]>([]);
  const { house, colors } = useHouse();

  const getWizards = async () => {
    const { data } = await api.get("/Wizards");
    setData(data);
  };

  useEffect(() => {
    getWizards();
  }, [house]);

  const formatName = (firstName?: string, lastName?: string) => {
    if (!firstName) return lastName;
    if (!lastName) return firstName;
    return `${firstName} ${lastName}`;
  };

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
        <ThemedText type='title'>Wizards</ThemedText>
      </ThemedView>
      <ThemedView
        style={{ maxWidth: 500, marginHorizontal: "auto", width: "100%" }}
      >
        {data?.map((wizard) => (
          <View
            key={wizard.id}
            style={{ ...styles.card, shadowColor: colors.tint }}
          >
            <ThemedText key={wizard.id} style={styles.cardTitle}>
              {formatName(wizard.firstName, wizard.lastName)}
            </ThemedText>
            <Collapsible title='Elixirs: '>
              {wizard.elixirs.map((elixir) => (
                <ThemedText style={styles.cardListItem} key={elixir.id}>
                  {elixir.name}
                </ThemedText>
              ))}
            </Collapsible>
          </View>
        ))}
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
    maxWidth: 500,
    width: "100%",
    marginHorizontal: "auto",
  },
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#282b2c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
  },
  cardListItem: {
    fontSize: 16,
    marginLeft: 16,
  },
});
