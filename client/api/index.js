import { postReq, getReq } from "../service/http.service";
import { userUrl, loginUrl, dataUrl } from "../constant/url";
import AuthService from "../service/auth.service";

export function createUser(data) {
  return postReq(userUrl, data);
}

export function login(data) {
  return postReq(loginUrl, data)
    .then(res => {
      new AuthService().setAuthToken(res);
    })
    .catch(err => console.log(err));
}

export function getData() {
  return getReq(dataUrl);
}
