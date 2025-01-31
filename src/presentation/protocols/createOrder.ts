export type CreateOrderModel = {
  orderNumber: string;
  createdAt: string;
  message: string;
  details: object;
};

export type CreateOrderParams = {
  items: {
    title: string;
    value: number;
  }[];
  paymentOption: string;
};

export namespace CreateOrder {
  export type Params = CreateOrderParams;
  export type Model = CreateOrderModel;
}

export interface CreateOrder {
  createOrder(params: CreateOrder.Params): Promise<CreateOrder.Model>;
}
