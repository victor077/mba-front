import { AppetizersModel } from "../models/appetizersModel";

export namespace Appetizers {
  export type Model = AppetizersModel;
}

export interface Appetizers {
  getAppetizers(): Promise<Appetizers.Model[]>;
}
