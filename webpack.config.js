const debug = process.env.NODE_ENV !== "production";

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/index.js",
  output: {
    path: __dirname + "/static",
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            //   sourceMap: true,
            //   importLoaders: 1,
            //   localIdentName: "[name]--[local]--[hash:base64:8]"
            // }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
};