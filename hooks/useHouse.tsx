import { Colors, houseColors } from "@/constants/Colors";
import { HouseType, IThemeProvider } from "@/utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const houseContext = createContext<IThemeProvider>({
  theme: "light",
  house: undefined,
  setSelectedHouse: () => {},
  colors: Colors.light,
  isLoading: true,
  setIsLoading: () => {},
});

const useHouse = () => {
  const context = useContext(houseContext);
  if (!context) {
    throw new Error("useHouse must be used within a HouseProvider");
  }
  const { theme, house, setSelectedHouse, colors, isLoading, setIsLoading } =
    context;

  useEffect(() => {
    AsyncStorage.getItem("house").then((h) => {
      if (house && h !== house) {
        AsyncStorage.setItem("house", house);
      }
    });
  }, [house]);

  return { theme, house, setSelectedHouse, colors, isLoading, setIsLoading };
};

const HouseProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const [selectedHouse, setSelectedHouse] = useState<HouseType>(null as any);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHouse = async () => {
      const h = await AsyncStorage.getItem("house");
      if (h) {
        setSelectedHouse(h as HouseType);
      } else {
        setSelectedHouse("gryffindor");
      }
    };
    getHouse();
  }, []);

  const selectedHouseColors = houseColors[selectedHouse];
  const colors =
    colorScheme === "dark"
      ? { ...DarkTheme, ...selectedHouseColors?.dark }
      : { ...DefaultTheme, ...selectedHouseColors?.light };

  const value = useMemo(
    () => ({
      setSelectedHouse,
      theme: colorScheme ?? "light",
      house: selectedHouse,
      colors,
      isLoading,
      setIsLoading,
    }),
    [colorScheme, selectedHouse, selectedHouse, isLoading, colors]
  );

  return (
    <houseContext.Provider value={value}>
      <ThemeProvider value={colors}>{children}</ThemeProvider>
    </houseContext.Provider>
  );
};

export { HouseProvider, useHouse };
