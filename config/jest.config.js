module.exports = {

  "rootDir": '../',

  "setupTestFrameworkScriptFile": "<rootDir>/config/jest-setup.config.js",

  // Sets up mocks for images and files that the tests either can't handle
  // or doesn't make sense to include

  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.js"
  }

}