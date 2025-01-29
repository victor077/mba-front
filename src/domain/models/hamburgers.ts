export type HamburgersModel = {
  id: number;
  image: string[];
  title: string;
  description: string;
  values: {
    single: number;
    combo: number;
  };
};
