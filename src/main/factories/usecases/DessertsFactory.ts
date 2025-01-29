import { MakeApiUrl, MakeAxiosHttpClient } from "../http";
import { apiRoutes } from "@/main/routes/apiRoutes";
import { Appetizers } from "@/domain";
import { Desserts } from "@/domain/usecases/desserts";
import { GetDesserts } from "@/data";

export const MakeDesserts = (): Desserts => {
  return new GetDesserts(
    MakeApiUrl(apiRoutes.desserts),
    MakeAxiosHttpClient<null, Appetizers.Model>()
  );
};
