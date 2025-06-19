const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove all plugins that might use ajv
      const pluginsToRemove = [
        'ForkTsCheckerWebpackPlugin',
        'ESLintWebpackPlugin',
        'TypeScriptTypeChecker'
      ];
      
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => !pluginsToRemove.includes(plugin.constructor.name)
      );
      
      // Override module resolution to skip ajv-keywords issues
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          'ajv-keywords': false,
          'fork-ts-checker-webpack-plugin': false,
        },
      };
      
      // Disable source maps to speed up build
      webpackConfig.devtool = false;
      
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
  style: {
    postcss: {
      mode: 'file',
    },
  },
};