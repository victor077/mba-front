import { Categories } from "@/domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";
import { GetCategories } from "@/data";

export const MakeCategories = (): Categories => {
  return new GetCategories(
    MakeApiUrl(apiRoutes.categories),
    MakeAxiosHttpClient<null, Categories.Model>()
  );
};
