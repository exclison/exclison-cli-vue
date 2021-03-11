"use strict";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { getDevConfig } = require("./baseconfig.js");

const webpackConfig = getDevConfig();
const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  historyApiFallback: true,
  open: true,
  hot: true,
  inline: true,
  stats: "errors-warnings",
  overlay: {
    // 浏览器全屏显示错误
    errors: true,
    warnings: false,
  },
  stats: {
    colors: true,
  },
});

const dev = (port = 8090)=>{
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(port, "127.0.0.1", () => {
    console.log(`Starting server on http://localhost:${port}`);
  });
}

module.exports = dev

