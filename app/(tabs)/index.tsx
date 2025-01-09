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
import React, { useEffect, useState } from "react";

const mapLogo = {
  Gryffindor: require("@/assets/gryffindor.png"),
  Hufflepuff: require("@/assets/hufflepuff.png"),
  Ravenclaw: require("@/assets/ravenclaw.png"),
  Slytherin: require("@/assets/slytherin.png"),
};

export default function HomeScreen() {
  const { setSelectedHouse, house } = useHouse();
  const [houses, setHouses] = useState([] as IHouse[]);
  const [activeHouse, setActiveHouse] = useState({} as IHouse);

  useEffect(() => {
    api.get("/Houses").then(({ data }) => {
      setHouses(data);
    });
  }, []);

  useEffect(() => {
    setActiveHouse(houses.find(({ name }) => name.toLowerCase() === house)!);
  }, [house]);

  return (
    <ScrollView>
      <ThemedView>
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Welcome to Hogwarts!
        </ThemedText>
        <ThemedText>
          Meet our four houses: Gryffindor, Hufflepuff, Ravenclaw, and
          Slytherin. Each house has its own unique characteristics and values.
          Which house do you belong to?
        </ThemedText>
        <ThemedView>
          <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
            {activeHouse.name}
          </ThemedText>
          <Image
            source={mapLogo[activeHouse.name as keyof typeof mapLogo]}
            style={styles.reactLogo}
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
          <ThemedText style={{ fontWeight: "bold" }}>House Colours:</ThemedText>
          <ThemedView
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            {activeHouse.houseColours.split(",").map((colour) => (
              <ThemedView
                key={colour}
                style={{
                  backgroundColor: colour,
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            ))}
          </ThemedView>
          <ThemedText style={{ fontWeight: "bold" }}>House Heads:</ThemedText>
          <FlatList
            data={activeHouse.heads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ThemedText>
                <ThemedText style={{ fontWeight: "bold" }}>Head:</ThemedText>{" "}
                {item.firstName} {item.lastName}
              </ThemedText>
            )}
          />
          <ThemedText style={{ fontWeight: "bold" }}>House Traits:</ThemedText>
          <FlatList
            data={activeHouse.traits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ThemedText>
                <ThemedText style={{ fontWeight: "bold" }}>Trait:</ThemedText>{" "}
                {item.name}
              </ThemedText>
            )}
          />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {houses.map((house, index) => (
            <TouchableOpacity
              key={house.id}
              style={{
                padding: 8,
                borderRadius: 8,
              }}
              onPress={() =>
                setSelectedHouse(house.name.toLowerCase() as HouseType)
              }
            >
              <ThemedText>{house.name}</ThemedText>
            </TouchableOpacity>
          ))}
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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
