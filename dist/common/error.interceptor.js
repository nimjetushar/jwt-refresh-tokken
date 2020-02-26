"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/* eslint-disable no-unused-vars */
/**
 * intercepts error and handles app error
 * @export
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
exports.default = function (err, req, res, next) {
  var errorTrace = err.error,
      status = err.status;

  if (errorTrace) {
    console.log(errorTrace);
  }
  res.status(status).json({ status: status, message: err.message });
};