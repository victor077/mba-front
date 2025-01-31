import { PostCreateOrder } from "@/data";
import { CreateOrder } from "../../../domain";
import { apiRoutes } from "../../routes/apiRoutes";
import { MakeApiUrl, MakeAxiosHttpClient } from "../http";

export const MakeCreateOrder = (): CreateOrder => {
  return new PostCreateOrder(
    MakeApiUrl(apiRoutes.createOrder),
    MakeAxiosHttpClient<CreateOrder.Params, CreateOrder.Model>()
  );
};
