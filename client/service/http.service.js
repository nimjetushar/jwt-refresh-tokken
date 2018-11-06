import { EXCLUDE_AUTH_TOKEN } from "../constant/app.constant";
import AuthService from "./auth.service";

const authService = new AuthService();

function skipAuthToken(url) {
  for (const item of EXCLUDE_AUTH_TOKEN) {
    if (url.include(item)) {
      return true;
    }
  }
  return false;
}

function reqObj(obj, url, data) {
  let headerObj = {
    "Content-Type": "application/json; charset=utf-8"
  };

  if (skipAuthToken(url)) {
    const token = authService.authToken;
    headerObj = Object.assign({}, headerObj, { "": token });
  }

  const requestObj = {
    cache: "no-cache",
    headers: headerObj,
    body: JSON.stringify(data)
  };
  return Object.assign(obj, requestObj);
}

export const getReq = url => {
  return fetch(url, reqObj({ method: "GET" }, url))
    .then(res => res.json())
    .catch(err => err);
};

export const postReq = (url, data) => {
  return fetch(url, reqObj({ method: "POST" }, url, data))
    .then(res => res.json())
    .catch(err => err);
};

export const putReq = (url, data) => {
  return fetch(url, reqObj({ method: "PUT" }, url, data))
    .then(res => res.json())
    .catch(err => err);
};

export const deleteReq = (url, data) => {
  return fetch(url, reqObj({ method: "DELETE" }, url, data))
    .then(res => res.json())
    .catch(err => err);
};
