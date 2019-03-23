const webpackMerge = require("webpack-merge"),
  commonConfig = require("./webpack.common.js"),
  path = require("path"),
  port = 3000;

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",

  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: `http://localhost:${port}/`,
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },

  devServer: {
    inline: true,
    port: port,
    historyApiFallback: true,
    stats: "minimal"
  }
});
