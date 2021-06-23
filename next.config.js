const withTM = require("next-transpile-modules")([
  "zepp/packages/utils",
  "zepp/packages/react",
]);

const path = require("path");

module.exports = withTM({
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__/));
    config.resolve.alias["@zepp/react"] = "zepp/packages/react/";
    config.resolve.alias["@zepp/utils"] = "zepp/packages/utils/";
    config.resolve.alias.react = path.resolve("./node_modules/react");
    return config;
  },
});
