"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  "port": 8080,
  "bodyLimit": "100kb",
  "corsHeaders": ["Link"],
  "db_url": "mongodb://localhost:27017/authorization",
  "auth_token_timeout": 86400000,
  "refresh_token_timeout": "2d",
  "reset_token_timeout": 300000
};

exports.default = config;