import { AuthHttpClientDecorator } from "../../decorators";
import { MakeAxiosHttpClient } from "../http";
import { HttpClient } from "../../../data/protocols";

export const MakeAuthHttpClientDecorator = <
  BodyType,
  ResponseType
>(): HttpClient<BodyType, ResponseType> => {
  const { token } = JSON.parse(sessionStorage.getItem("token"));

  const authToken = `Bearer ${token}`;

  return new AuthHttpClientDecorator(
    authToken,
    MakeAxiosHttpClient<BodyType, ResponseType>()
  );
};
