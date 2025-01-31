import { AuthenticationModel, AuthenticationParams } from "../models";
import {
  CreateOrderModel,
  CreateOrderParams,
} from "../models/createOrderModel";

export namespace CreateOrder {
  export type Params = CreateOrderParams;
  export type Model = CreateOrderModel;
}

export interface CreateOrder {
  createOrder(params: CreateOrder.Params): Promise<CreateOrder.Model>;
}
