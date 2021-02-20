// Copyright © 2021 Brandon Li. All rights reserved.

/**
 * ESlint configuration file. See https://eslint.org/docs/user-guide/configuring for documentation of implementing
 * the .eslintrc file.
 *
 * Values for the rules:
 *   0 - no error
 *   1 - warn
 *   2 - error
 *
 * See https://eslint.org/docs/rules for documentation on rules.
 *
 * @author Brandon Li <brandon.li@berkeley.edu>
 */

module.exports = {

  // Extend the following configurations. See https://eslint.vuejs.org/rules/ and https://eslint.org/docs/rules/.
  extends: [
    '@vue/standard',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue-scoped-css/all'
  ],

  // Overriding rules.
  rules: {

    /* ———————————————————————————————— Whitespace ———————————————————————————————————————— */

    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': [ 2, { singleline: 10, multiline: { max: 1 } } ],
    'vue/html-closing-bracket-spacing': [ 2, { selfClosingTag: 'never' } ],
    'computed-property-spacing': [ 2, 'never' ],
    'no-multi-spaces': [ 2, { ignoreEOLComments: true } ],
    'space-before-blocks': 2,
    'space-before-function-paren': [ 2, { asyncArrow: 'always', named: 'never', anonymous: 'never' } ],
    'spaced-comment': [ 2, 'always', { exceptions: [ '-', '*', '=' ] } ],
    'semi-spacing': 2,
    'brace-style': [ 2, 'stroustrup', { allowSingleLine: true } ], // See https://eslint.org/docs/rules/brace-style
    'no-trailing-spaces': 2,
    'eol-last': [ 2, 'never' ],
    'lines-around-comment': [ 2, {
      afterBlockComment: false,
      beforeLineComment: true,
      afterLineComment: false
    } ],
    'indent': 0,

    'vue/array-bracket-spacing': [ 2, 'always' ],
    'vue/block-spacing': [ 2, 'always' ],
    'vue/comma-spacing': [ 2, { before: false, after: true } ],
    'vue/key-spacing': 2,
    'vue/keyword-spacing': [ 2, { overrides: { catch: { after: !!0 } } } ],
    'vue/object-curly-spacing': [ 2, 'always' ],
    'vue/space-in-parens': [ 2, 'never' ],
    'vue/func-call-spacing': [ 2, 'never' ],
    'vue/template-curly-spacing': [ 2, 'never' ],

    'array-bracket-spacing': [ 2, 'always' ],
    'block-spacing': [ 2, 'always' ],
    'comma-spacing': [ 2, { before: false, after: true } ],
    'key-spacing': 2,
    'keyword-spacing': [ 2, { overrides: { catch: { after: !!0 } } } ],
    'object-curly-spacing': [ 2, 'always' ],
    'space-in-parens': [ 2, 'never' ],
    'func-call-spacing': [ 2, 'never' ],
    'template-curly-spacing': [ 2, 'never' ],

    /* —————————————————————————————— Best Practices —————————————————————————————————————— */

    'vue/max-len': [ 2, {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true
    } ],
    'vue/prefer-template': 2,
    'vue/no-v-html': 0,
    'no-unused-vars': [ 2, { args: 'none' } ],
    'comma-dangle': 2,
    'semi': [ 2, 'always' ],
    'prefer-const': [ 2, {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    } ],
    'eqeqeq': 2,
    'no-caller': 2,
    'no-new-func': 2,
    'dot-notation': 2,
    'no-var': 2,
    'no-template-curly-in-string': 2,
    'no-extend-native': 2,
    'no-return-assign': 2,
    'no-useless-call': 2,
    'no-undef-init': 2,
    'one-var': [ 2, 'never' ],
    'radix': 2,
    'default-case': 2,
    'object-shorthand': 2,
    'no-console': 2,

    /* ———————————————————————————————— Stylistic ————————————————————————————————————————— */

    'quotes': [ 2, 'single' ],
    'quote-props': [ 2, 'consistent-as-needed' ],
    'vue/html-quotes': [ 2, 'single' ],
    'vue/attributes-order': [ 2, {
      order: [
        'DEFINITION',
        'CONDITIONALS',
        'LIST_RENDERING',
        'UNIQUE',
        'GLOBAL',
        'TWO_WAY_BINDING',
        'OTHER_ATTR',
        'EVENTS',
        'OTHER_DIRECTIVES',
        'RENDER_MODIFIERS',
        'CONTENT'
      ]
    } ],
    'vue/require-default-prop': 0,
    'padded-blocks': 0
  },
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};