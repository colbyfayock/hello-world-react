module.exports = {

  "env": {
    "browser": true
  },

  "parser": "babel-eslint",

  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "rules": {
    "semi": [ 2, "always" ],
    "no-console": [ 1 ]
  },

  "plugins": [
    "react"
  ],

  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]

}