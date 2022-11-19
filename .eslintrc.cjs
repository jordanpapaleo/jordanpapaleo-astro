module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:astro/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jsx-a11y', 'react', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // 'astro/no-set-html-directive': 'error'
        'prettier/prettier': 'error',
      },
    },
    // ...
  ],
  rules: {
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
