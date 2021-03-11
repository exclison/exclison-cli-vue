const { VueLoaderPlugin } = require("vue-loader");
const { HotModuleReplacementPlugin } = require('webpack');
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.getVuePlugin = function () {
  return new VueLoaderPlugin();
};

exports.getEslintPlugin = function (mode, options) {
  if (mode === "development") return {};
  return new ESLintPlugin(Object.assign({}, options));
};
exports.getHtmlWebpackPlugin = function (options) {
  return new HtmlWebpackPlugin(Object.assign({}, options));
};
exports.getMiniCssExtractPlugin = function (options) {
  return new MiniCssExtractPlugin(
    Object.assign(
      {
        filename: "assets/style/[name].[contenthash].css",
      },
      options
    )
  );
};
exports.getTerserPlugin = function (options) {
  return new TerserPlugin(
    Object.assign(
      {
        // cache: true, // 使用 cache，加快二次构建速度
        parallel: true, // 开启多线程
        extractComments: true,
        terserOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          },
        },
      },
      options
    )
  );
};
exports.getHotModuleReplacementPlugin = function () {
  return new HotModuleReplacementPlugin();
};
exports.getCleanWebpackPlugin = function (options) {
    return new CleanWebpackPlugin(Object.assign({}, options));
  }
