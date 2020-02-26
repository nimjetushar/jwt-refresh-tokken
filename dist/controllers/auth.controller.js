"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _auth = require("../models/auth.model");

var _user = require("../models/user.model");

var router = (0, _express.Router)();

router.post("/create", _user.createUser);

router.post("/login", _auth.loginUser);

router.get("/logout", _auth.logout);

exports.default = router;