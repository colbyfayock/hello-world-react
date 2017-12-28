const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Plugin Configuration
 */

const HtmlWebpack = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const ExtractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true
});


/*
 * Webpack Config
 */

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

      // Sass / CSS

      {
        test: /\.(css|scss)$/,
        use: ExtractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },

      // Javascript

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
    HtmlWebpack,
    ExtractSass
  ]

}

module.exports = config;