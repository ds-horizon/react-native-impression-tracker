const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { getConfig } = require('react-native-builder-bob/metro-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');
const libraryPath = path.resolve(__dirname, '..');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = getConfig(
  {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      extraNodeModules: {
        // Force the library to use these shared instances
        'react': path.resolve(__dirname, 'node_modules/react'),
        'react-native': path.resolve(__dirname, 'node_modules/react-native'),
        '@react-navigation/native': path.resolve(
          __dirname,
          'node_modules/@react-navigation/native'
        ),
      },
    },
    watchFolders: [libraryPath],
  },
  {
    root,
    pkg,
    project: __dirname,
  }
);
