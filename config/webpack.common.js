const Webpack = require('webpack');
const path = require('path');
const Env = require('./env.config.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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

const ExtractSass = new MiniCssExtractPlugin({
  filename: `${Env.assets_path}/css/[name].[contenthash].css`,
  chunks: 'all'
});

/*
 * Webpack Config
 */

const config = {

  entry: [
    'babel-polyfill',
    `./${Env.base_path}/${Env.assets_path}/js/main.js`,
    `./${Env.base_path}/${Env.assets_path}/scss/main.scss`
  ],

  output: {
    path: path.resolve(`./${Env.output_path}`),
    filename: `${Env.assets_path}/js/app.[hash].js`
  },

  resolve: {
    extensions: [ '.js', '.json' ]
  },

  module: {

    strictExportPresence: true,

    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${Env.config_path}/postcss.config.js`
              }
            }
          }
        ]
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
        test: /\.(png|jpg|gif|svg|webp)$/,
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