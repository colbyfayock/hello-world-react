const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
  allChunks: true
});

const config = {

  entry: [
    './app/assets/js/main.js',
    './app/assets/scss/main.scss'
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'app.[hash].js'
  },

  module: {

    rules: [

      {
        test: /\.(css|scss)$/,
        use: ExtractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },

      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }

    ]

  },

  plugins: [

    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
      inject: 'body'
    }),

    new UglifyJsPlugin(),
    ExtractSass,

  ]

}

module.exports = config;