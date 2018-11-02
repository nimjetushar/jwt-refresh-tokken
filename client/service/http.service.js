function reqObj(obj, data) {
  return Object.assign(obj, {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  });
}

export const getReq = url => {
  return fetch(url, reqObj({ method: "GET" }))
    .then(res => res.json())
    .catch(err => err);
};

export const postReq = (url, data) => {
  return fetch(url, reqObj({ method: "POST" }, data))
    .then(res => res.json())
    .catch(err => err);
};

export const putReq = (url, data) => {
  return fetch(url, reqObj({ method: "PUT" }, data))
    .then(res => res.json())
    .catch(err => err);
};

export const deleteReq = (url, data) => {
  return fetch(url, reqObj({ method: "DELETE" }, data))
    .then(res => res.json())
    .catch(err => err);
};
