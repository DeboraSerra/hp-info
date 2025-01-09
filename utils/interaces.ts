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
