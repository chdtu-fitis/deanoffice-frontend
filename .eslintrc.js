module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 1,
        ArrayExpression: 1,
        ObjectExpression: 1
      }
    ],
    'comma-dangle': [ 'error', 'always' ],
    'linebreak-style': [ 'error', 'unix' ],
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'always' ],
    'no-undef': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    'no-cond-assign': [ 'error', 'always' ],
    eqeqeq: [ 'error', 'always' ],
    'no-console': 'error',
    'no-debugger': 'error',
    'block-scoped-var': 'error',
    'no-loop-func': 'error',
    'no-self-compare': 'error',
    'no-unneeded-ternary': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true
      }
    ],
    'no-new': 'off',
    'template-curly-spacing': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'object-property-newline': [ 'error' ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 2
        },
        ObjectPattern: 'never',
        ImportDeclaration: 'never',
        ExportDeclaration: 'never',
      }
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2
      }
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'array-bracket-spacing': [ 'error', 'always' ]
  }
};
