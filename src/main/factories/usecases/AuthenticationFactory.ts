import { PostAuthentication } from "../../../data"
import { Authentication } from "../../../domain"
import { MakeApiUrl, MakeAxiosHttpClient } from "../http"

export const MakeAuthentication = (): Authentication => {
  return new PostAuthentication(
    MakeApiUrl("https://api.com/auth"),
    MakeAxiosHttpClient<Authentication.Params, Authentication.Model>()
  )
}
