"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _auth = require("../models/auth.model");

var router = (0, _express.Router)();

router.post("/create", _auth.createUser);

router.post("/login", _auth.authenticateUser);

exports.default = router;
//# sourceMappingURL=auth.controller.js.map