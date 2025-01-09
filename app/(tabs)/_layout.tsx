import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import Hogwarts from "@/components/ui/HogwartsIcon";
import PotionIcon from "@/components/ui/PotionIcon";
import TabBarBackground from "@/components/ui/TabBarBackground";
import WandIcon from "@/components/ui/WandIcon";
import WizardIcon from "@/components/ui/WizardIcon";
import { Colors } from "@/constants/Colors";
import { useHouse } from "@/hooks/useHouse";

export default function TabLayout() {
  const { theme } = useHouse();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Houses",
          tabBarIcon: ({ color }) => <Hogwarts size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='wizards'
        options={{
          title: "Wizards",
          tabBarIcon: ({ color }) => <WizardIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='spells'
        options={{
          title: "Spells",
          tabBarIcon: ({ color }) => <WandIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='elixirs'
        options={{
          title: "Elixirs",
          tabBarIcon: ({ color }) => <PotionIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
