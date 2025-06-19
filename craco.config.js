module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove the ForkTsCheckerWebpackPlugin that's causing issues
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
      );
      
      // Disable ESLint plugin as well
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
      );
      
      return webpackConfig;
    },
  },
  babel: {
    presets: [],
    plugins: [],
  },
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
};