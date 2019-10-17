/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  configureWebpack: {
    resolve: {
      alias: require("./aliases.config").webpack
    }
  }
};
