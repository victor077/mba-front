export type CreateOrderModel = {
  orderNumber: string;
  createdAt: string;
  message: string;
  details: object;
};

export type CreateOrderParams = {
  items: [
    {
      title: string;
      value: number;
    }
  ];
  paymentOption: string;
};
