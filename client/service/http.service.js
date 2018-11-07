import {
  EXCLUDE_AUTH_TOKEN,
  SUCCESS_STATUS_API
} from "../constant/app.constant";
import AuthService from "./auth.service";

const authService = new AuthService();

function skipAuthToken(url) {
  for (const item of EXCLUDE_AUTH_TOKEN) {
    if (url.includes(item)) {
      return true;
    }
  }
  return false;
}

function reqObj(url, obj, data) {
  let headerObj = {
    "Content-Type": "application/json; charset=utf-8"
  };

  if (!skipAuthToken(url)) {
    const token = authService.authToken;
    headerObj = Object.assign({}, headerObj, { "x-auth-token": token });
  }

  const requestObj = {
    cache: "no-cache",
    headers: headerObj,
    body: JSON.stringify(data)
  };
  return [url, Object.assign(obj, requestObj)];
}

function callApi(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options).then(res => {
      res.json().then(parsedData => {
        if (SUCCESS_STATUS_API.includes(res.status)) {
          if (!skipAuthToken(url) && res.headers) {
            const authToken = res.headers["x-auth-token"];
            authService.updateAuthToken(authToken);
          }
          resolve(parsedData);
        } else {
          reject(parsedData);
        }
      });
    });
  });
}

export const getReq = url => {
  const obj = reqObj(url, { method: "GET" });
  return callApi(...obj);
};

export const postReq = (url, data) => {
  const obj = reqObj(url, { method: "POST" }, data);
  return callApi(...obj);
};

export const putReq = (url, data) => {
  const obj = reqObj(url, { method: "PUT" }, data);
  return callApi(...obj);
};

export const deleteReq = (url, data) => {
  const obj = reqObj(url, { method: "DELETE" }, data);
  return callApi(...obj);
};
