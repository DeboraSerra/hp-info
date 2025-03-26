import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHouse } from "@/hooks/useHouse";
import api from "@/utils/api";
import mapHouseLogo from "@/utils/images";
import { HouseType, IElixirs } from "@/utils/interfaces";
import { Gauge } from "lucide-react-native";
import { useEffect, useState } from "react";

const difficultyColor = {
  Unknown: "#fff",
  Beginner: "#00ff00",
  Moderate: "#ffcc00",
  Advanced: "#ff0000",
  OrdinaryWizardingLevel: "#ff00ff",
  OneOfAKind: "#0000ff",
};

export default function TabTwoScreen() {
  const [data, setData] = useState<IElixirs[]>([]);
  const [displayData, setDisplayData] = useState<IElixirs[]>([]);
  const [query, setQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const { house, colors } = useHouse();

  const getElixirs = async () => {
    const { data } = await api.get("/Elixirs");
    const formattedData = data.sort((a: IElixirs, b: IElixirs) => {
      if (a.name === b.name) {
        return 0;
      }
      if (!a.name) {
        return 1;
      }
      if (!b.name) {
        return -1;
      }
      return a.name > b.name ? 1 : -1;
    });
    setData(formattedData);
    setDisplayData(formattedData);
  };

  useEffect(() => {
    getElixirs();
  }, [house]);

  useEffect(() => {
    if (!query) {
      setDisplayData(data);
      return;
    }
    setDisplayData(
      data.filter((elixir) => {
        const texts = [
          elixir.name,
          elixir.effect,
          elixir.sideEffects,
          elixir.characteristics,
          elixir.time,
          elixir.difficulty,
          ...elixir.ingredients.map((ingredient) => ingredient.name),
          ...elixir.inventors.map(
            (inventor) => `${inventor.firstName} ${inventor.lastName}`
          ),
        ];
        return texts.some((text) =>
          text?.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }, [query]);

  const btnTextColor = (difficulty: keyof typeof difficultyColor) => {
    if (selectedDifficulty === difficulty) {
      return house === "hufflepuff" ? colors.background : colors.icon;
    }
    return colors.background;
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
        <ThemedText type='title'>Elixirs</ThemedText>
      </ThemedView>
      <View
        style={{
          maxWidth: 500,
          marginHorizontal: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={{ ...styles.input, borderColor: colors.tint }}
        />
        <TouchableOpacity
          onPress={() => {
            setSelectedDifficulty("");
            setQuery("");
            setDisplayData(data);
          }}
          style={{
            backgroundColor: colors.tint,
            width: "auto",
            maxWidth: 500,
            marginHorizontal: "auto",
            padding: 8,
            borderRadius: 20,
          }}
        >
          <ThemedText
            style={{
              ...styles.cardText,
              color: house === "hufflepuff" ? colors.background : colors.icon,
            }}
          >
            Clear filters
          </ThemedText>
        </TouchableOpacity>
      </View>
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
        {displayData.length} elixirs
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        {Object.keys(difficultyColor).map((difficulty, index) => (
          <TouchableOpacity
            key={difficulty}
            style={{
              backgroundColor:
                selectedDifficulty === difficulty ? colors.tint : colors.icon,
              width: "auto",
              maxWidth: 500,
              marginHorizontal: "auto",
              padding: 8,
              borderRadius: 20,
            }}
            onPress={() => {
              setDisplayData(
                data.filter((elixir) => elixir.difficulty === difficulty)
              );
              setSelectedDifficulty(difficulty);
            }}
          >
            <ThemedText
              style={{
                ...styles.cardText,
                color: btnTextColor(difficulty as keyof typeof difficultyColor),
                fontSize: selectedDifficulty === difficulty ? 16 : 14,
              }}
            >
              {difficulty}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
      <ThemedView
        style={{ maxWidth: 500, marginHorizontal: "auto", width: "100%" }}
      >
        {displayData?.map((elixir) => (
          <View
            key={elixir.id}
            style={{ ...styles.card, shadowColor: colors.tint }}
          >
            <ThemedText
              key={elixir.id}
              style={{
                ...styles.cardTitle,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Gauge
                color={
                  difficultyColor[
                    elixir.difficulty as keyof typeof difficultyColor
                  ]
                }
              />
              {elixir.name}
            </ThemedText>
            {!!elixir.effect && (
              <ThemedText style={styles.cardText}>
                <span style={{ fontWeight: 600 }}>Effect: </span>
                {elixir.effect}
              </ThemedText>
            )}
            {!!elixir.sideEffects && (
              <ThemedText style={styles.cardText}>
                <span style={{ fontWeight: 600 }}>Side Effects: </span>
                {elixir.sideEffects}
              </ThemedText>
            )}
            {!!elixir.characteristics && (
              <ThemedText style={styles.cardText}>
                <span style={{ fontWeight: 600 }}>Characteristics: </span>
                {elixir.characteristics}
              </ThemedText>
            )}
            {!!elixir.time && (
              <ThemedText style={styles.cardText}>
                <span style={{ fontWeight: 600 }}>Time: </span>
                {elixir.time}
              </ThemedText>
            )}
            {!!elixir.difficulty && (
              <ThemedText style={styles.cardText}>
                <span style={{ fontWeight: 600 }}>Difficulty: </span>
                {elixir.difficulty}
              </ThemedText>
            )}
            {!!elixir.manufacturer && (
              <ThemedText style={styles.cardText}>
                <span style={{ fontWeight: 600 }}>Manufacturer: </span>
                {elixir.manufacturer}
              </ThemedText>
            )}
            {elixir.ingredients.length > 0 && (
              <Collapsible title='Ingredients: '>
                <View>
                  {elixir.ingredients.map((ingredient) => (
                    <ThemedText key={ingredient.id} style={styles.cardListItem}>
                      {ingredient.name}
                    </ThemedText>
                  ))}
                </View>
              </Collapsible>
            )}
            {elixir.inventors.length > 0 && (
              <Collapsible title='Inventors: '>
                <View>
                  {elixir.inventors.map((inventor) => (
                    <ThemedText key={inventor.id} style={styles.cardListItem}>
                      {inventor.firstName} {inventor.lastName}
                    </ThemedText>
                  ))}
                </View>
              </Collapsible>
            )}
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
  stepContainer: {
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
});
