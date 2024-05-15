module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['error'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-var': 'error',
    'no-console': 'error',
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    eqeqeq: ['error', 'always'],
    'no-trailing-spaces': 'error',
    indent: ['error', 2],
    'no-empty': 'error',
    'space-in-parens': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-spaces': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'array-bracket-spacing': ['error', 'never']
  }
}
