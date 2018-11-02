import { postReq } from "../service/http.service";
import { userUrl, loginUrl } from "../constant/url";

export function createUser(data) {
  return postReq(userUrl, data);
}

export function login(data) {
  return postReq(loginUrl, data);
}
