import { Beverages } from "@/domain/usecases/beverages";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";
import { apiRoutes } from "@/main/routes/apiRoutes";
import { GetBeverages } from "@/data/usecases/GetBeverages";

export const MakeBeverage = (): Beverages => {
  return new GetBeverages(
    MakeApiUrl(apiRoutes.beverages),
    MakeAxiosHttpClient<null, Beverages.Model>()
  );
};
