export type HouseType = "gryffindor" | "hufflepuff" | "ravenclaw" | "slytherin";

export interface IHouseTheme {
  light: {
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  dark: {
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
}

export interface IThemeProvider {
  theme: "light" | "dark";
  house: HouseType | null | undefined;
  setSelectedHouse: (house: HouseType) => void;
  colors: IHouseTheme["light"];
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export interface IHouse {
  id: string;
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
  heads: { id: string; firstName: string; lastName: string }[];
  traits: {
    id: string;
    name: string;
  }[];
}

export interface IWizard {
  elixirs: {
    id: string;
    name: string;
  }[];
  id: string;
  firstName: string;
  lastName: string;
}
