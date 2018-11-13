import HttpService from "../service/http.service";
import { userUrl, loginUrl, dataUrl, logoutUrl } from "../constant/url";
import AuthService from "../service/auth.service";

export function createUser(data) {
  return HttpService.postReq(userUrl, data);
}

export function login(data) {
  return new Promise((resolve, reject) => {
    HttpService.postReq(loginUrl, data)
      .then(res => {
        new AuthService().setAuthToken(res);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getData() {
  return HttpService.getReq(dataUrl);
}

export function logout() {
  return HttpService.getReq(logoutUrl);
}
