import { PaymentsOptionsModel } from "../models";

export namespace PaymentsOptions {
  export type Model = PaymentsOptionsModel;
}

export interface PaymentsOptions {
  getPaymentsOptions(): Promise<PaymentsOptions.Model[]>;
}
