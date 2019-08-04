module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': {},
    'postcss-flexbugs-fixes': require('postcss-flexbugs-fixes')
  }
};