import { MakeApiUrl, MakeAxiosHttpClient } from "../http";
import { apiRoutes } from "@/main/routes/apiRoutes";
import { Appetizers } from "@/domain";
import { GetAppetizers } from "@/data/usecases/GetAppetizers";

export const MakeAppertize = (): Appetizers => {
  return new GetAppetizers(
    MakeApiUrl(apiRoutes.appetizers),
    MakeAxiosHttpClient<null, Appetizers.Model>()
  );
};
