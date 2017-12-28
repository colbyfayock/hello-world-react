const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Common = require('./webpack.common.js');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/**
 * Plugin Configuration
 */

const UglifyJS = new UglifyJSPlugin({
  sourceMap: true
});

const WebpackDefine = new Webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});


/*
 * Webpack Config
 */

const config = {

  devtool: 'source-map',

  plugins: [
    UglifyJS,
    WebpackDefine
  ]

}

module.exports = Merge(Common, config);