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
export default (err, req, res, next) => {
  const errorTrace = err.error,
    status = err.status;

  if (errorTrace) {
    console.log(errorTrace);
  }
  res.status(status).json({ status: status, message: err.message });
};
