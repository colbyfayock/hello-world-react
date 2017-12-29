const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/**
 * Plugin Configuration
 */

// Compresses and minifies JS builds

const UglifyJS = new UglifyJSPlugin({
  sourceMap: true,
  uglifyOptions: {
    ecma: 5,
    compress: {
      // disabled because of an issue with Uglify breaking seemingly valid code:
      // https://github.com/facebookincubator/create-react-app/issues/2376
      // via create-react-app
      comparisons: false
    },
    mangle: {
      // Works around the Safari 10 loop iterator bug "Cannot declare a let variable twice"
      safari10: true
    },
    output: {
      // turned on because emoji and regex is not minified properly using default
      // https://github.com/facebookincubator/create-react-app/issues/2488
      // via create-react-app
      ascii_only: true
    }
  }
});

// Creates a template HTML file and produces the dist version
// with dependencies injected. Manages to additionally compress
// the file removing whitespace and empty attributes

const HtmlWebpack = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});


/*
 * Webpack Config
 */

const config = {

  // Don't attempt to continue if there are any errors.

  bail: true,

  // Produces source maps for production debugging
  // https://webpack.js.org/configuration/devtool/

  devtool: 'source-map',

  plugins: [
    UglifyJS,
    HtmlWebpack
  ]

}

module.exports = Merge(Common, config);