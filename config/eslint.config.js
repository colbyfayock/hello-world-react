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
    "semi": [ 2, "always" ]
  },

  "plugins": [
    "react"
  ],

  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]

}