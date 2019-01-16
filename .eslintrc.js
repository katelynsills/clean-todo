module.exports = {
  extends: ['airbnb', "plugin:promise/recommended", "plugin:security/recommended"],
  env: {
    es6: true,
    mocha: true,
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'arrow-parens': 'off',
  },
  "plugins": ["promise", "security"]
};
