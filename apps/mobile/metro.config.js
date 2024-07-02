const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg", "ts", "tsx"],
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

module.exports = mergeConfig(defaultConfig, config);
