module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react/prefer-stateless-function': 0,
    'no-useless-constructor': 0,
    'react/no-find-dom-node': 0,
    'react/sort-comp': 0,
  },
  globals: {
    document: 1,
  },
  parser: 'babel-eslint',
  env: {
    browser: 1,
  },
};
