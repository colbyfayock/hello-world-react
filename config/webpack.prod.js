const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Common = require('./webpack.common.js');
const Env = require('./env.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const settings = {
  theme_color: '#f2575b'
}

/**
 * Plugin Configuration
 */

// Compresses and minifies JS builds

const MinifyJs = new TerserPlugin({
  cache: true,
  sourceMap: true,
  terserOptions: {
    parse: {
      ecma: 8
    },
    compress: {
      comparisons: false,
      inline: 2
    },
    mangle: {
      // Works around the Safari 10 loop iterator bug "Cannot declare a let variable twice"
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true
    }
  },
});

// Creates a template HTML file and produces the dist version
// with dependencies injected. Manages to additionally compress
// the file removing whitespace and empty attributes

const HtmlWebpack = new HtmlWebpackPlugin({
  template: `./${Env.base_path}/index.html`,
  filename: 'index.html',
  inject: 'body',
  theme_color: settings.theme_color,
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

// Automatically generate all of the favicons from the source image
const FaviconsWebpack = new FaviconsWebpackPlugin({
  logo: `./${Env.base_path}/${Env.assets_path}/images/favicon-prod.png`,
  prefix: `${Env.assets_path}/images/icons-[hash]/`,
  background: settings.theme_color,
  title: Env.name,
  icons: {
    android: true,
    appleIcon: true,
    favicons: true,
    appleStartup: false,
    coast: false,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
})


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
    HtmlWebpack,
    FaviconsWebpack
  ],

  optimization: {
    minimizer: [MinifyJs]
  }

}

module.exports = Merge(Common, config);