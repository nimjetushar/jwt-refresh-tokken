const HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    vender: "./client/vender.js",
    app: "./client/main.js"
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // include: [path.resolve(__dirname, "client")],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        // include: [path.resolve(__dirname, "client")],
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: "file-loader?name=pubic/fonts/[name].[ext]"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Input FileName
      filename: "./index.html" // Output FileName
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
