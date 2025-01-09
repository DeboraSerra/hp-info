import { houseColors } from "@/constants/Colors";
import { HouseType, IThemeProvider } from "@/utils/interaces";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const houseContext = createContext<IThemeProvider>({
  theme: "light",
  house: undefined,
  setSelectedHouse: () => {},
});

const useHouse = () => {
  const context = useContext(houseContext);
  if (!context) {
    throw new Error("useHouse must be used within a HouseProvider");
  }
  const { theme, house, setSelectedHouse } = context;
  return { theme, house, setSelectedHouse };
};

const HouseProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const [selectedHouse, setSelectedHouse] = useState<HouseType | undefined>(
    "gryffindor"
  );

  const value = useMemo(
    () => ({
      setSelectedHouse,
      theme: colorScheme ?? "light",
      house: selectedHouse,
    }),
    [colorScheme, selectedHouse]
  );

  const selectedHouseColors = selectedHouse
    ? houseColors[selectedHouse]
    : undefined;
  const colors =
    colorScheme === "dark"
      ? { ...DarkTheme, ...selectedHouseColors?.dark }
      : { ...DefaultTheme, ...selectedHouseColors?.light };

  return (
    <houseContext.Provider value={value}>
      <ThemeProvider value={colors}>{children}</ThemeProvider>
    </houseContext.Provider>
  );
};

export { HouseProvider, useHouse };
