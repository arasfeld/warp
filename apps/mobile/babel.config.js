module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // react-native-reanimated/plugin must be listed last
      // Note: reanimated v4+ already includes worklets plugin internally
      'react-native-reanimated/plugin',
    ],
  };
};
