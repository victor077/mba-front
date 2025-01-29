import { MakeApiUrl, MakeAxiosHttpClient } from "../http";
import { apiRoutes } from "@/main/routes/apiRoutes";
import { Hamburgers } from "@/domain/usecases/hamburgers";
import { GetHamburgers } from "@/data/usecases/GetHamburgers";

export const MakeHamburger = (): Hamburgers => {
  return new GetHamburgers(
    MakeApiUrl(apiRoutes.hamburgers),
    MakeAxiosHttpClient<null, Hamburgers.Model>()
  );
};
