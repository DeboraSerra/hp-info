import { Image, StyleSheet, TextInput, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHouse } from "@/hooks/useHouse";
import api from "@/utils/api";
import mapHouseLogo from "@/utils/images";
import { HouseType, ISpell } from "@/utils/interfaces";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [data, setData] = useState<ISpell[]>([]);
  const [displayData, setDisplayData] = useState<ISpell[]>([]);
  const [query, setQuery] = useState("");
  const { house, colors } = useHouse();

  const getSpells = async () => {
    const { data } = await api.get("/Spells");
    const formattedData = data.sort((a: ISpell, b: ISpell) => {
      if (a.incantation === b.incantation) {
        return 0;
      }
      if (!a.incantation) {
        return 1;
      }
      if (!b.incantation) {
        return -1;
      }
      return a.incantation > b.incantation ? 1 : -1;
    });
    setData(formattedData);
    setDisplayData(formattedData);
  };

  useEffect(() => {
    getSpells();
  }, [house]);

  useEffect(() => {
    if (!query) {
      setDisplayData(data);
      return;
    }
    setDisplayData(
      data.filter((spell) => {
        const texts = [spell.incantation, spell.name, spell.effect, spell.type];
        return texts.some((text) =>
          text?.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }, [query]);

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
      <TextInput
        value={query}
        onChangeText={setQuery}
        style={{ ...styles.input, borderColor: colors.tint }}
      />
      <ThemedText
        style={{
          ...styles.cardText,
          color: house === "hufflepuff" ? colors.background : colors.icon,
          backgroundColor: colors.tint,
          width: "auto",
          maxWidth: 500,
          marginHorizontal: "auto",
          padding: 8,
          borderRadius: 20,
        }}
      >
        {displayData.length} spells
      </ThemedText>
      <ThemedView
        style={{ maxWidth: 500, marginHorizontal: "auto", width: "100%" }}
      >
        {displayData?.map((spell) => (
          <View
            key={spell.id}
            style={{ ...styles.card, shadowColor: colors.tint }}
          >
            <ThemedText key={spell.id} style={styles.cardTitle}>
              {spell.incantation}
            </ThemedText>
            <ThemedText style={styles.cardText}>
              <ThemedText style={{ fontWeight: 600 }}>Name: </ThemedText>
              {spell.name}
            </ThemedText>
            <ThemedText style={styles.cardText}>
              <ThemedText style={{ fontWeight: 600 }}>Effect: </ThemedText>
              {spell.effect}
            </ThemedText>
            <ThemedText style={styles.cardText}>
              <ThemedText style={{ fontWeight: 600 }}>Type: </ThemedText>
              {spell.type}
            </ThemedText>
            <ThemedText style={styles.cardText}>
              <ThemedText style={{ fontWeight: 600 }}>
                Can Be Verbal:{" "}
              </ThemedText>
              {spell.canBeVerbal ? "Yes" : "No"}
            </ThemedText>
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
  input: {
    backgroundColor: "#282b2c",
    color: "white",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 500,
    marginHorizontal: "auto",
  },
});
