module.exports = {
  extends: 'airbnb',
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
  rules: {
    'arrow-parens': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'no-use-before-define': ['error', {
      functions: false,
      classes: false
    }],
    'object-curly-newline': ['error', {
      multiline: true,
      consistent: true,
    }],
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
    }],
    'import/no-webpack-loader-syntax': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.js',
      },
    },
  },
};
