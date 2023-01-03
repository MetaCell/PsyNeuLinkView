const webpack = require('webpack');
const rewireSass = require('react-app-rewire-sass-modules');

module.exports = function override(config, env) {
  // Sass configuration
  config = rewireSass(config, env);
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
    'process/browser': require.resolve('process/browser'),
    'react/jsx-runtime': require.resolve('react/jsx-runtime.js'),
    'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime.js'),
  };
  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.js'];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];
  config.module.rules = [...config.module.rules];
  return config;
};

