const webpackMerge = require("webpack-merge"),
 commonConfig = require("./webpack.common.js"),
 OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
 path = require("path");

module.exports = webpackMerge(commonConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist/client"),
    publicPath: "./",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },
  plugins: [new OptimizeCSSAssetsPlugin({})]
});
