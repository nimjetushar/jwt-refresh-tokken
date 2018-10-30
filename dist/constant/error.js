"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorObj = {
  UNAUTHORIZED_USER: {
    status: 401,
    message: "Unauthorized user"
  },
  BAD_REQUEST: {
    status: 400,
    message: "invalid input parameters"
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "internal server error"
  },
  INVAILD_USERNAME: {
    status: 401,
    message: "invalid username"
  },
  NO_DATA_FOUND: {
    status: 201,
    message: "no data found"
  },
  RESOURCE_ALREADY_EXIST: {
    status: 409,
    message: "Duplicate data"
  },
  USERNAME_EXIST: {
    status: 409,
    message: "username already exist"
  },
  INVALID_PASSWORD: {
    status: 401,
    message: "invalid password"
  }
};

exports.default = errorObj;
//# sourceMappingURL=error.js.map