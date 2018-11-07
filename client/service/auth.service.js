import { LS_AUTH_TOKEN, LS_USER_DETAIL } from "../constant/app.constant";

let _authToken = "",
  _userDetail;

export default class AuthService {
  get authToken() {
    if (!_authToken) {
      _authToken = sessionStorage.getItem(LS_AUTH_TOKEN);
    }
    return _authToken;
  }

  get userDetail() {
    if (!_userDetail) {
      _userDetail = JSON.parse(sessionStorage.getItem(LS_USER_DETAIL));
    }
    return _userDetail;
  }

  setAuthToken(data) {
    _authToken = data.token;
    _userDetail = data;
    sessionStorage.setItem(LS_AUTH_TOKEN, _authToken);
    sessionStorage.setItem(LS_USER_DETAIL, JSON.stringify(data));
  }

  updateAuthToken(token) {
    if (token !== _authToken) {
      _authToken = token;
      sessionStorage.setItem(LS_AUTH_TOKEN, token);
    }
  }

  logout() {
    _authToken = "";
    _userDetail = undefined;
    sessionStorage.removeItem(LS_AUTH_TOKEN);
    sessionStorage.removeItem(LS_USER_DETAIL);
  }
}
