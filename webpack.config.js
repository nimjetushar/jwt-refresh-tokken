module.exports = env => {
  // eslint-disable-next-line global-require
  return (env && env.production) ? require("./config/webpack.prod") : require("./config/webpack.dev");
};
