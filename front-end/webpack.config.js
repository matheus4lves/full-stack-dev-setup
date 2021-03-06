const path = require("path");
const postcssPlugins = [require("postcss-import")];

let mode = process.env.npm_lifecycle_event;

let config = {
  entry: "./app/assets/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
        ],
      },
    ],
  },
  target: "web",
};

if (mode === "dev") {
  config.devServer = {
    host: "local-ip",
    hot: true,
    open: {
      app: {
        name: "firefox",
        arguments: ["--private-window"],
      },
    },
    port: 3000,
    static: {
      directory: path.join(__dirname, "app/public"),
    },
  };
}

if (mode === "build") {
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [["@babel/preset-env", { targets: "defaults" }]],
      },
    },
  });
}

module.exports = config;
