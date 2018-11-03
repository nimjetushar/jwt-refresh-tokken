import { postReq, getReq } from "../service/http.service";
import { userUrl, loginUrl, dataUrl } from "../constant/url";

export function createUser(data) {
  return postReq(userUrl, data);
}

export function login(data) {
  return postReq(loginUrl, data);
}

export function getData() {
  return getReq(dataUrl);
}