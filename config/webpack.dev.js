const Webpack = require('webpack');
const Merge = require('webpack-merge');
const Common = require('./webpack.common.js');

/**
 * Plugin Configuration
 */

const WebpackDefine = new Webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(false),
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
});


/*
 * Webpack Config
 */

const config = {

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist'
  },

  plugins: [
    WebpackDefine
  ]

}

module.exports = Merge(Common, config);