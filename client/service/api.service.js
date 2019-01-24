import HttpService from "./http.service";
import {
  userUrl,
  loginUrl,
  dataUrl,
  logoutUrl,
  verifyUserUrl,
  resetPasswordUrl
} from "../constant/url";
import AuthService from "./auth.service";

export default class ApiService {
  static createUser(data) {
    return HttpService.postReq(userUrl, data);
  }

  static login(data) {
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

  static getData() {
    return HttpService.getReq(dataUrl);
  }

  static logout() {
    return HttpService.getReq(logoutUrl);
  }

  static verifyUser(data) {
    return HttpService.postReq(verifyUserUrl, data);
  }

  static resetPassword(data) {
    return HttpService.putReq(resetPasswordUrl, data);
  }
}
