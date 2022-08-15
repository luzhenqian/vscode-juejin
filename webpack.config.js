const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    post: "./src/views/app/post/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, "views"),
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {}
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new Dotenv()
  ]
};