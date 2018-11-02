const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require("path");

module.exports = webpackMerge(commonConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "./",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [new OptimizeCSSAssetsPlugin({})]
});
