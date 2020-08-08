module.exports = {
  extends: '@funboxteam',
  env: {
    browser: true,
  },
  globals: {
    angular: true,
    ymaps: true,
    BASE_PATH: true,
    describe: true,
    it: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.js',
      },
    },
  },
};
