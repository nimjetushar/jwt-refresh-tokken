const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const path = require("path");
const port = 3000;

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),
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
