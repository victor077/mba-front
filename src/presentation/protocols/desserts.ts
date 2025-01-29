export type DessertsModel = {
  id: number;
  image: string;
  title: string;
  description: string;
  value: number;
};

export namespace Desserts {
  export type Model = DessertsModel;
}

export interface Desserts {
  getDesserts(): Promise<Desserts.Model[]>;
}
