"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _resetPassword = require("../models/resetPassword.model");

var router = (0, _express.Router)();

router.post("/verifyUser", _resetPassword.verifyUser);

router.put("/password", _resetPassword.resetPassword);

exports.default = router;