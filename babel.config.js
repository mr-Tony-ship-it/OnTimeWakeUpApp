module.exports = function (api) {
  api.cache(true); // Enable caching for faster builds

  return {
    presets: ['babel-preset-expo'], // Use Expo preset
    plugins: [
      'react-native-reanimated/plugin', // For Reanimated animations
      '@babel/plugin-proposal-export-namespace-from',
    ],
  };
};
