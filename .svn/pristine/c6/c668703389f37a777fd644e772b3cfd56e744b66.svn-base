const {version} = require('./package.json')

export default {
  "entry": "src/index.js",
  "theme": "./theme.config.js",
  "publicPath": `/`,
  "outputPath": `./dist/${version}`,
  "ignoreMomentLocale": true,
  "disableDynamicImport": true,
  "hash": true,
  "extraBabelPlugins": [
    "transform-decorators-legacy",
    ["import", {"libraryName": "antd", "style": true}]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "html": {
    "template": "./src/entry.ejs"
  },
  "alias": {
    "utils": `${__dirname}/src/utils`,
    "config": `${__dirname}/src/utils/config`,
    "enums": `${__dirname}/src/utils/enums`,
    "service": `${__dirname}/src/webappService`,
    "wfservice": `${__dirname}/src/utils/workflowService`,
    "themes": `${__dirname}/src/themes`,
    "components": `${__dirname}/src/components`,
  }
}
