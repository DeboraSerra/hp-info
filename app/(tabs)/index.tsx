import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHouse } from "@/hooks/useHouse";
import api from "@/utils/api";
import mapHouseLogo from "@/utils/images";
import { HouseType, IHouse } from "@/utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  const { setSelectedHouse, house, colors, isLoading, setIsLoading } =
    useHouse();
  const [houses, setHouses] = useState([] as IHouse[]);
  const [activeHouse, setActiveHouse] = useState(
    undefined as IHouse | undefined
  );

  const getHouses = async () => {
    const { data } = await api.get("/Houses");
    setHouses(data);
    const house = await AsyncStorage.getItem("house");
    if (!house) {
      setActiveHouse(data[0]);
      setSelectedHouse(data[0].name.toLowerCase() as HouseType);
    } else {
      setActiveHouse(data.find((h: IHouse) => h.name.toLowerCase() === house));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getHouses();
  }, []);

  useEffect(() => {
    setActiveHouse(houses.find((h) => h.name.toLowerCase() === house));
  }, [house]);

  useEffect(() => {
    if (activeHouse && isLoading) {
      setIsLoading(false);
    }
  }, [activeHouse]);

  if (isLoading || !activeHouse) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 40, paddingBottom: 68 }}>
      <ThemedView style={{ padding: 16 }}>
        <ThemedText style={styles.title}>Welcome to Hogwarts!</ThemedText>
        <ThemedText style={styles.textCenter}>
          Meet our four houses. Each house has its own unique characteristics
          and values. Which house do you belong to?
        </ThemedText>
        <ThemedView style={styles.stepContainer}>
          {houses.map((h, index) => (
            <TouchableOpacity
              key={h.id}
              style={{
                padding: 3,
              }}
              onPress={() =>
                setSelectedHouse(h.name.toLowerCase() as HouseType)
              }
            >
              <ThemedText
                style={{
                  color:
                    h.name.toLowerCase() === house ? colors.tint : colors.text,
                  fontSize: h.name.toLowerCase() === house ? 18 : 14,
                  fontWeight: "bold",
                  textShadowColor:
                    h.name.toLowerCase() === house ? colors.text : "",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 8,
                }}
              >
                {h.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
        <ThemedView
          style={{ maxWidth: 500, marginHorizontal: "auto", width: "100%" }}
        >
          <ThemedText style={styles.title}>{activeHouse.name}</ThemedText>
          <Image
            source={mapHouseLogo[house as HouseType]}
            style={styles.houseLogo}
          />
          <View>
            <ThemedText style={styles.text}>
              <ThemedText style={styles.cardTitle}>Founder:</ThemedText>{" "}
              {activeHouse.founder}
            </ThemedText>
            <ThemedText style={styles.text}>
              <ThemedText style={styles.cardTitle}>Animal:</ThemedText>{" "}
              {activeHouse.animal}
            </ThemedText>
            <ThemedText style={styles.text}>
              <ThemedText style={styles.cardTitle}>Element:</ThemedText>{" "}
              {activeHouse.element}
            </ThemedText>
            <ThemedText style={styles.text}>
              <ThemedText style={styles.cardTitle}>Ghost:</ThemedText>{" "}
              {activeHouse.ghost}
            </ThemedText>
            <ThemedText style={styles.text}>
              <ThemedText style={styles.cardTitle}>Common Room:</ThemedText>{" "}
              {activeHouse.commonRoom}
            </ThemedText>
            <View style={styles.card}>
              <ThemedText style={{ ...styles.cardTitle, fontWeight: "bold" }}>
                House Heads:
              </ThemedText>
              {activeHouse.heads.map((item) => (
                <ThemedText key={item.id}>
                  {item.firstName} {item.lastName}
                </ThemedText>
              ))}
            </View>
            <View style={styles.card}>
              <ThemedText
                style={{ ...styles.text, fontWeight: "bold", marginTop: 12 }}
              >
                House Traits:
              </ThemedText>
              {activeHouse.traits.map((item) => (
                <ThemedText key={item.id}>{item.name}</ThemedText>
              ))}
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  textCenter: { fontSize: 16, textAlign: "center", marginBottom: 12 },
  text: { fontSize: 16, marginBottom: 12 },
  stepContainer: {
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  houseLogo: {
    height: 178,
    width: 290,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 12,
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
    fontSize: 20,
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
