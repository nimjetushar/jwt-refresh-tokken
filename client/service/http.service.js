import axios from "axios";
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
    headerObj = Object.assign({}, headerObj, { authorization: token });
  }

  const requestObj = {
    headers: headerObj,
    data: data,
    url: url
  };
  return [url, Object.assign(obj, requestObj)];
}

function callApi(url, options) {
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        const parsedData = res.data;
        if (SUCCESS_STATUS_API.includes(res.status)) {
          if (!skipAuthToken(url) && res.headers) {
            const authToken = res.headers["authorization"];
            authService.updateAuthToken(authToken);
          }
          resolve(parsedData);
        } else {
          reject(parsedData);
        }
      })
      .catch(err => {
        reject(err);
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
