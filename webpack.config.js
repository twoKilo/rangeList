let path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,

        include: [path.resolve(__dirname, "src")],

        exclude: /node_modules/,

        loader: "babel-loader",
      },
    ],
  },
};
