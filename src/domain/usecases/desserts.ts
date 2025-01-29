import { DessertsModel } from "../models/dessertsModel";

export namespace Desserts {
  export type Model = DessertsModel;
}

export interface Desserts {
  getDesserts(): Promise<Desserts.Model[]>;
}
