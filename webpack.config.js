
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  context: __dirname,
  devtool: 'inline-sourcemap',
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-bootstrap'],
  },
  output: {
    path: __dirname + "/static",
    filename: '[name].bundle.js',
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
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
    }),
  ]
};