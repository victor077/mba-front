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

export namespace Hamburgers {
  export type Model = HamburgersModel;
}

export interface Hamburgers {
  getHamburgers(): Promise<Hamburgers.Model[]>;
}
