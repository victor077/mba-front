export type BeveragesModel = {
  id: number;
  image: string;
  title: string;
  description: string;
  value: number;
};

export namespace Beverages {
  export type Model = BeveragesModel;
}

export interface Beverages {
  getBeverages(): Promise<Beverages.Model[]>;
}
