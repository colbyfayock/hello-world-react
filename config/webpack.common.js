const Webpack = require('webpack');
const path = require('path');

const Env = require('./env.config.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Plugin Configuration
 */

// Makes some environment variables available to the JS code

const WebpackDefine = new Webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(Env.env === 'production' ? true : false),
  'process.env': {
    'NODE_ENV': JSON.stringify(Env.env)
  },
  ENV: Env
});

// Pulls the CSS from the loader and produces it's own external file

const ExtractSass = new ExtractTextPlugin({
  filename: `${Env.assets_path}/css/[name].[contenthash].css`,
  allChunks: true
});


/*
 * Webpack Config
 */

const config = {

  entry: [
    'babel-polyfill',
    './app/assets/js/main.js',
    './app/assets/scss/main.scss'
  ],

  output: {
    path: path.resolve('dist'),
    filename: `${Env.assets_path}/js/app.[hash].js`
  },

  resolve: {
    extensions: [ '.js', '.json' ]
  },

  module: {

    strictExportPresence: true,

    rules: [

      // Sass / CSS
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "sass" loader adds Sass support
      // "postcss" loader applies autoprefixer to our CSS.
      // fallback "style" loader turns CSS into JS modules that inject <style> tags.
      // Additional config: ./config/postcss.config.js

      {
        test: /\.(css|scss)$/,
        use: ExtractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'postcss-loader',
              query: {
                config: {
                  path: `${Env.config_path}/postcss.config.js`
                }
              }
            }
          ]
        })
      },

      // Javascript
      // "babel" loader bundles js componenents and runs a
      //     series of presets including polyfills as well as
      //     react and translation of newer JS syntax
      // Additional config: ./.babelrc

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },

      // Images
      // "file" loader takes all of the images and verifies they're
      //     imported to the final destination with the  correct path.
      //     This requires the images to be "required" in the components
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${Env.assets_path}/images/[name].[hash].[ext]`,
            }
          }
        ]
      }

    ]

  },

  plugins: [
    WebpackDefine,
    ExtractSass
  ]

}

module.exports = config;