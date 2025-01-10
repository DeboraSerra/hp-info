import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHouse } from "@/hooks/useHouse";
import api from "@/utils/api";
import { HouseType, IHouse } from "@/utils/interaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import mapHouseLogo from "@/utils/images";

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
    <ScrollView>
      <ThemedView>
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Welcome to Hogwarts!
        </ThemedText>
        <ThemedText>
          Meet our four houses. Each house has its own unique characteristics
          and values. Which house do you belong to?
        </ThemedText>
        <ThemedView style={styles.stepContainer}>
          {houses.map((h, index) => (
            <TouchableOpacity
              key={h.id}
              style={{
                padding: 8,
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
        <ThemedView>
          <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
            {activeHouse.name}
          </ThemedText>
          <Image
            source={mapHouseLogo[house as HouseType]}
            style={styles.houseLogo}
          />
          <ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>Founder:</ThemedText>{" "}
            {activeHouse.founder}
          </ThemedText>
          <ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>Animal:</ThemedText>{" "}
            {activeHouse.animal}
          </ThemedText>
          <ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>Element:</ThemedText>{" "}
            {activeHouse.element}
          </ThemedText>
          <ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>Ghost:</ThemedText>{" "}
            {activeHouse.ghost}
          </ThemedText>
          <ThemedText>
            <ThemedText style={{ fontWeight: "bold" }}>Common Room:</ThemedText>{" "}
            {activeHouse.commonRoom}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>House Heads:</ThemedText>
          <FlatList
            data={activeHouse.heads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ThemedText>
                {item.firstName} {item.lastName}
              </ThemedText>
            )}
          />
          <ThemedText style={{ fontWeight: "bold" }}>House Traits:</ThemedText>
          <FlatList
            data={activeHouse.traits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ThemedText>{item.name}</ThemedText>}
          />
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },
  houseLogo: {
    height: 178,
    width: 290,
    resizeMode: "contain",
  },
});
