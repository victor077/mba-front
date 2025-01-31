import {
  Authentication,
  BadRequestError,
  CreateOrder,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  PreconditionFailedError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "../../domain";
import { HttpClient, HttpStatusCode } from "../protocols";

export class PostCreateOrder implements CreateOrder {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      CreateOrder.Params,
      CreateOrder.Model
    >
  ) {}

  async createOrder(params: CreateOrder.Params): Promise<CreateOrder.Model> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}`,
      method: "post",
      body: params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.Ok:
        return httpResponse.body as CreateOrder.Model;
      case HttpStatusCode.Forbidden:
        throw new ForbiddenError();
      case HttpStatusCode.PreconditionFailed:
        throw new PreconditionFailedError();
      case HttpStatusCode.UnprocessableEntity:
        throw new UnprocessableEntityError();
      case HttpStatusCode.BadRequest:
        throw new BadRequestError();
      case HttpStatusCode.Unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.NotFound:
        throw new NotFoundError();
      default:
        throw new InternalServerError();
    }
  }
}
