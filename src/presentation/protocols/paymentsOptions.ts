export type PaymentsOptionsModel = {
  id: string;
  value: number;
  text: string;
};

export namespace PaymentsOptions {
  export type Model = PaymentsOptionsModel;
}

export interface PaymentsOptions {
  getPaymentsOptions(): Promise<PaymentsOptions.Model[]>;
}
