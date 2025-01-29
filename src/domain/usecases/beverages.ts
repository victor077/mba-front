import { BeveragesModel } from "../models/beveragesModel";

export namespace Beverages {
  export type Model = BeveragesModel;
}

export interface Beverages {
  getBeverages(): Promise<Beverages.Model[]>;
}
