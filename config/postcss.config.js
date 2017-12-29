module.exports = {
  'plugins': {
    'postcss-cssnext': {
      'browsers': [
        'last 4 versions',
        'Firefox ESR',
        'ie >= 10',
        '>1%'
      ]
    },
    'postcss-flexbugs-fixes': require('postcss-flexbugs-fixes')
  },
};