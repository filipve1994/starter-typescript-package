// https://www.raulmelo.me/en/blog/migration-eslint-to-flat-config

// @ts-check
import antfu from '@antfu/eslint-config';

// https://github.com/antfu/eslint-config

export default antfu({
    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
        '**/fixtures',
        'eslint.config.js',
        // ...globs
    ],

    // Enable stylistic formatting rules
    // stylistic: true,

    // Or customize the stylistic rules
    stylistic: {
        semi: true,
        indent: 2, // 4, or 'tab'
        quotes: 'single', // or 'double'
    },

    // TypeScript and Vue are auto-detected, you can also explicitly enable them:
    typescript: true,

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false

});