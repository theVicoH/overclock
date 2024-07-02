const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

const config = {
  resolver: {
    extraNodeModules: new Proxy(
      {
        common: path.resolve(__dirname, "../../packages/common/src"),
      },
      {
        get: (target, name) => {
          return (
            target[name] ||
            path.resolve(__dirname, `node_modules/${name}`)
          );
        },
      }
    ),
  },
  watchFolders: [
    path.resolve(__dirname, "../../node_modules"),
    path.resolve(__dirname, "node_modules"),
    path.resolve(__dirname, "../../packages/common"),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
