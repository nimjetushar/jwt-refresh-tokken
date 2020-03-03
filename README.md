# jwt authentication solution

[![Build Status](https://semaphoreci.com/api/v1/nimjetushar/jwt-authentication-solution/branches/dependabot-npm_and_yarn-body-parser-1-19-0/shields_badge.svg)](https://semaphoreci.com/nimjetushar/jwt-authentication-solution)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/37a5a6dcf7f84a6ba3a7b4c379b40b65)](https://www.codacy.com/app/tushar/jwt-authentication-solution?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nimjetushar/jwt-authentication-solution&amp;utm_campaign=Badge_Grade)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=nimjetushar/jwt-authentication-solution)](https://dependabot.com)
<br/>
[![GitHub license](https://img.shields.io/github/license/nimjetushar/jwt-authentication-solution.svg)](https://github.com/nimjetushar/jwt-authentication-solution/blob/master/LICENSE)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/nimjetushar/jwt-authentication-solution)
![GitHub pull requests](https://img.shields.io/github/issues-pr/nimjetushar/jwt-authentication-solution)

Project provide the end to end solution for authentication. 
It covers following points:-
 - User creation
 - Login
 - logout
 - Reset password / Forget password

## Api

### Create new user 
```
Request: POST
api: /api/auth/create
Request: {  name: string;
            email: string;
            password: string;   }
Success: Return user success message
```
### Login to create authorization token
```
Request: POST
api: /api/auth/login
Request: {  username: string;
            password: string;   }
Success: {  email: string;
            name: string;
            role: string;
            token: string;
            loginTime: number;  }
```
### Logout from that particular session
```
Request: GET
api: /api/auth/logout

Require "authorization" Header with recived token.
```
### Verify user before changing password and issue reset token to process for change password request
```
Verifies if user exists and sends reset token which can be used to reset password by password serivice
Request: POST
api: /api/reset/verifyUser
Request: {  email: string; }
Success: {  resetToken: string;
            email: string;  }
```
### Upadate user password
```
Takes reset token which is send by verifyUser service 
Request: POST
api: /api/reset/password
Request: {  resetToken: string;
            password: string;
            confirmPassword: string;
            email: string;  }
```
### Verify received authorization token
```
Request: POST
api: /api/auth/verify

Require "authorization" Header with recived token.
```
### Client UI
```
Request: GET
api: /

Return client application which can be used to login / create user / change password.
```


### Options
Application configurations can be updated using config.js

1: Port
Default port is 8080 but can be updated as required.

2: db_url
DB url where authorization collection is present.

3: auth_token_timeout
Duration for which auth token send to client side will be valid.
Default is 1 day.

4: refresh_token_timeout
Duration for which refresh token will be valid which stats a logined user will be valid into application.
Default is 2 days.

5: reset_token_timeout
Duration for which password reset token is valid.
Default 5 min.

The implementaion is based on JWT tokken having concept of refresh tokken and auth tokken to keep user authenticated and reset token in case of password reset.

Server implementation can be verified using Client application which is present in `/client`.

## Usefull commands

Start client locally
```npm run client```

Start server locally
```npm run server```

Build client and server
```npm run build```



