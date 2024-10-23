export default [
  {
    ignores: ['node_modules/**'], // Ignore node_modules
    files: ['**/*.js'], // Include all JS files in the project
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  }
];
  