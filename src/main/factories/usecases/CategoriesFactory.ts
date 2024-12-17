import { apiRoutes } from "../../routes/apiRoutes";
import { MakeAuthHttpClientDecorator } from "../decorators/authHttpClientDecoratorFactory";
import { MakeApiUrl } from "../http";

export const MakeCategories = (): Orders => {
  return new GetCategories(
    MakeApiUrl(apiRoutes.orders),
    MakeAuthHttpClientDecorator<Orders.Params, Orders.Model>()
  );
};
