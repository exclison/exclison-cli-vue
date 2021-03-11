const {
  getCssLoader,
  getAssetLoader,
  getBabelLoader,
  getLessLoader,
  getVueLoader,
} = require("./loader/index.js");

const {
  getCleanWebpackPlugin,
  getEslintPlugin,
  getHotModuleReplacementPlugin,
  getHtmlWebpackPlugin,
  getMiniCssExtractPlugin,
  getTerserPlugin,
  getVuePlugin,
} = require("./plugin/index.js");

const { resolve } = require("./util/index");
const path = require('path')

const getCommonConfig = function () {
  return {
    entry: path.resolve(__dirname,"../src/main.js"), // string | object | array  // 这里应用程序开始执行
    resolve: {
      alias: {
        // 模块别名列表
        "@": path.resolve(__dirname,"../src"),
      },
    },
  };
};

exports.getDevConfig = function () {
  const mode = "development";
  const common = getCommonConfig();

  const config = Object.assign(common, {
    mode,
    output: {
      path: path.resolve(__dirname,"../dist"),
      filename: "[name].[chunkhash].js",
    },
    module: {
      rules: [
        getCssLoader(mode),
        getBabelLoader(mode),
        getLessLoader(mode),
        getVueLoader(mode),
        ...getAssetLoader(mode),
      ],
    },
    plugins: [
      getEslintPlugin(),
      getHotModuleReplacementPlugin(),
      getHtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname,"../public/index.html"),
        minify: {
          caseSensitive: false, // 是否大小写敏感
          collapseWhitespace: true, // 是否去除空格
          removeAttributeQuotes: true, // 去掉属性引用
          removeComments: true, // 去注释
        },
      }),
      getVuePlugin(),
    ],
  });

  return config;
};

exports.getProConfig = function () {
  const mode = "production";
  const common = getCommonConfig();

  const config = Object.assign(common, {
    mode,
    output: {
      path: path.resolve(__dirname,"../dist"),
      filename: "[name].[chunkhash].js",
    },
    module: {
      rules: [
        getCssLoader(mode),
        getBabelLoader(mode),
        getLessLoader(mode),
        getVueLoader(mode),
        ...getAssetLoader(mode),
      ],
    },
    plugins: [
      getHtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname,"../public/index.html"),
        minify: {
          caseSensitive: false, // 是否大小写敏感
          collapseWhitespace: true, // 是否去除空格
          removeAttributeQuotes: true, // 去掉属性引用
          removeComments: true, // 去注释
        },
      }),
      getVuePlugin(),
      getCleanWebpackPlugin(),
      getMiniCssExtractPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [getTerserPlugin()],
    },
  });

  return config;
};
