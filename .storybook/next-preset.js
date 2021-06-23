const path = require("path");

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // SCSS preset for Storybook Global style & components
    newConfig.module.rules.push(
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loaders: ["babel-loader"],
        exclude: /node_modules\/(?!(zepp)\/).*/,
      },
      {
        test: /\.(s*)css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../styles/global.scss"),
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: [
          path.resolve(__dirname, "../components"),
          path.resolve(__dirname, "../utilities"),
        ],
      }
    );

    // Path Aliases
    newConfig.resolve.alias["@components"] = path.resolve(
      __dirname,
      "../components"
    );
    newConfig.resolve.alias["@utilities"] = path.resolve(
      __dirname,
      "../utilities"
    );
    newConfig.resolve.alias["@zepp/utils"] = "zepp/packages/utils/";
    newConfig.resolve.alias["@zepp/react"] = "zepp/packages/react/";

    return newConfig;
  },
};
