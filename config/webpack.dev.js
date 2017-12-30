const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Common = require('./webpack.common.js');
const Env = require('./env.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const settings = {
  theme_color: '#8997fa'
}

/**
 * Plugin Configuration
 */

// Creates a template HTML file and produces the dist version
// with dependencies injected

const HtmlWebpack = new HtmlWebpackPlugin({
  template: `./${Env.base_path}/index.html`,
  filename: 'index.html',
  inject: 'body',
  theme_color: settings.theme_color
});

// Automatically generate all of the favicons from the source image
const FaviconsWebpack = new FaviconsWebpackPlugin({
  logo: `./${Env.base_path}/${Env.assets_path}/images/favicon-dev.png`,
  prefix: `${Env.assets_path}/images/icons-[hash]/`,
  background: settings.theme_color
})


/*
 * Webpack Config
 */

const config = {

  // Produces source maps for development
  // https://webpack.js.org/configuration/devtool/

  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: `./${Env.output_path}`
  },

  plugins: [

    HtmlWebpack,

    // Add module names to factory functions so they appear in browser profiler.
    new Webpack.NamedModulesPlugin(),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin(),

    FaviconsWebpack

  ]

}

module.exports = Merge(Common, config);