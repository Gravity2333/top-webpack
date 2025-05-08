const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "./src/loaders/style-loader",
          {
            loader: "./src/loaders/css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
