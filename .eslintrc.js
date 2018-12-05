module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    mocha: true,
    jasmine: true,
  },
  parser: 'typescript-eslint-parser',
  plugins: [ 'typescript' ],
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
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-undef': 'error',
    'no-cond-assign': ['error', 'always'],
    eqeqeq: ['error', 'always'],
    'no-console': ['error', { allow: ['error'] } ],
    'no-debugger': 'error',
    'block-scoped-var': 'error',
    'no-loop-func': 'error',
    'no-self-compare': 'error',
    'no-unneeded-ternary': 'error',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true
      }
    ],
    'no-new': 'off',
    'template-curly-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error'],
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
        ObjectPattern: {
          multiline: true,
          minProperties: 5
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 5
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 5
        },
      }
    ],
    // 'array-bracket-newline': [
    //   'error',
    //   {
    //     multiline: true,
    //     minItems: 2
    //   }
    // ],
    // 'comma-spacing': [
    //   'error',
    //   {
    //     before: false,
    //     after: true
    //   }
    // ],
    // 'array-bracket-spacing': ['error', 'always'],
    // 'no-var': 'error',
    // 'camelcase': 'error',
    // "space-infix-ops": 'error',
    // 'space-unary-ops': ['error', {'words': true, 'nonwords': false}],
    // 'typescript/adjacent-overload-signatures': 'error',
    // 'typescript/class-name-casing': 'error',
    // 'typescript/explicit-function-return-type': 'error',
    // 'typescript/generic-type-naming': 'error',
    // 'typescript/member-ordering': [
    //   'error',
    //   {
    //     'classes': [
    //       'field', 'constructor', 'method'
    //     ],
    //   }
    // ],
    // 'typescript/no-array-constructor': 'error',
    // 'typescript/no-non-null-assertion': 'error',
    'typescript/no-unused-vars': ['warn'],
    // 'typescript/no-use-before-define': [
    //   'error',
    //   {
    //     functions: false,
    //     classes: true,
    //     variables: true,
    //     typedefs: true
    //   }
    // ],
    // 'typescript/type-annotation-spacing': 'error'
  }
};
