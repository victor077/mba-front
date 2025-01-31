import { MakeApiUrl, MakeAxiosHttpClient } from "../http";
import { apiRoutes } from "@/main/routes/apiRoutes";
import { PaymentsOptions } from "@/domain/usecases/paymentOptions";
import { GetPaymentsOptions } from "@/data";

export const MakePaymentsOptions = (): PaymentsOptions => {
  return new GetPaymentsOptions(
    MakeApiUrl(apiRoutes.options),
    MakeAxiosHttpClient<null, PaymentsOptions.Model>()
  );
};
