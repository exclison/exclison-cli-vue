const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const eslintLoader = {
  loader: "eslint-loader",
  options: {
    fix: true,
  },
};
exports.getCssLoader = function (mode) {
  return {
    test: /\.css$/,
    use: [
      {
        loader:
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
      },
      {
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
    ],
  };
};

exports.getBabelLoader = function (mode) {
  const use = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];

  if (mode === "development") use.push(eslintLoader);
  return {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use,
  };
};

exports.getAssetLoader = function (mode) {
  const mediaLoader = {
    test: /\.(mp4|mp3|rmvb|avi|wav|flv|webm)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };
  const imageLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };
  const fontLoader = {
    test: /\.(woff2|woff|eot|ttf|otf)$/i,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
    ],
  };
  return [mediaLoader, imageLoader, fontLoader];
};

exports.getLessLoader = function (mode) {
  return {
    test: /\.less$/i,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
      {
        loader: "less-loader",
      },
    ],
  };
};

exports.getVueLoader = function (mode) {
  const use = ["vue-loader"];
  if (mode === "development") use.push(eslintLoader);

  return {
    test: /\.vue$/,
    use,
  };
};
