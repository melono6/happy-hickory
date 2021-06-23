const path = require("path");
const webpack = require("webpack");

module.exports = {
  addons: ["@storybook/addon-docs", "@storybook/addon-controls"],
  stories: ["../components/**/*.stories.@(ts|tsx|js|jsx)"],
  presets: [path.resolve(__dirname, "./next-preset.js")],
  // Use <img /> instead of <Image />
  webpackFinal: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.__NEXT_IMAGE_OPTS": JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: [],
          path: "/",
          loader: "default",
        }),
      })
    );
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
    });
    return config;
  },
};
