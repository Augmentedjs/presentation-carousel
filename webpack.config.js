const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "presentation-carousel.js",
    publicPath: "/dist/",
    library: "presentation-carousel",
    globalObject: "this",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader"
        },
        {
          loader: "css-loader", options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  externals: {
    "presentation-decorator": {
      commonjs: "presentation-decorator",
      commonjs2: "presentation-decorator",
      amd: "presentation-decorator",
      root: "presentation-decorator"
    }
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
