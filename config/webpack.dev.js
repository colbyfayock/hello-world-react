const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

/**
 * Plugin Configuration
 */

// Creates a template HTML file and produces the dist version
// with dependencies injected

const HtmlWebpack = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body'
});


/*
 * Webpack Config
 */

const config = {

  // Produces source maps for development
  // https://webpack.js.org/configuration/devtool/

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: './dist'
  },

  plugins: [

    HtmlWebpack,

    // Add module names to factory functions so they appear in browser profiler.
    new Webpack.NamedModulesPlugin(),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin()

  ]

}

module.exports = Merge(Common, config);