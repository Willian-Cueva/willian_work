const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "assets/js/[name].js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "sass-loader",
            options: {
              implementation: require('dart-sass')
            },
          }
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/static/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    }),
    new miniCssExtractPlugin({
      filename: 'assets/styles/[name].css'
    })
  ],
  // Uncomment when to compile to production mode
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 0,
  //     name: 'commons'
  //   }
  // }
}
