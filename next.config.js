module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    global['self'] = {};

   
    config.plugins.push(
      new webpack.DefinePlugin({
        self: {},
      })
    );
    config.output.globalObject = 'this';
    return config;
  },
};
