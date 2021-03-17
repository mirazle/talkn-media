const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolve = require('./resolve');

module.exports = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          context: 'src/assets',
          from: '**/*',
          to: resolve('public'),
        },
      ],
    }),
  );

  config.target = 'node';

  config.module.rules.push(
    {
      test: /\.html$/i,
      loader: 'raw-loader',
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  );

  if (!isServer) {
    // for jsdom
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty',
    };
  }

  return config;
};
