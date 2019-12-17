/** @type import('@vue/cli-service').ProjectOptions */
const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: require("./aliases.config").webpack
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          FOO_VAR: JSON.stringify(process.env.FOO_VAR)
        }
      })
    ]
  }
};
