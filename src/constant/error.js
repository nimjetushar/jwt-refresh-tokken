const errorObj = {
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
  TOKEN_EXPIRED: {
    status: 401,
    message: "token expired"
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
  },
  USERNAME_DONT_EXIST: {
    status: 409,
    message: "username don't exist"
  },
  PASSWORD_DOES_NOT_MATCH: {
    status: 400,
    message: "Entered password does not match"
  },
  ERROR_ON_UPDATE: {
    status: 500,
    message: "Unable to update DB"
  }
};

export default errorObj;
