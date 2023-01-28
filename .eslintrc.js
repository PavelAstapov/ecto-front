module.exports = {
    env: {
        node: true,
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        'plugin:jest-formatting/strict',
    ],
    plugins: ['@typescript-eslint', 'jest', 'import', 'react-hooks', 'prettier', 'graphql'],
    rules: {
    // Padding rules
        'no-multiple-empty-lines': [2, {max: 1}],
        'padding-line-between-statements': [
            2,
            {blankLine: 'always', prev: '*', next: ['if', 'return']},
            {blankLine: 'always', prev: 'block-like', next: '*'},
            {blankLine: 'always', prev: ['const', 'let'], next: '*'},
            {blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let']},
        ],
        'lines-between-class-members': [2, 'always', {exceptAfterSingleLine: true}],
        // Import rules
        'import/no-extraneous-dependencies': [2, {devDependencies: true}],
        'import/order': [
            2,
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
                'newlines-between': 'always',
            },
        ],
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'import/prefer-default-export': 0,
        'import/extensions': [
            2,
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        // Prettier rules
        'prettier/prettier': [
            2,
            {
                trailingComma: 'all',
                singleQuote: true,
                printWidth: 120,
                endOfLine: 'auto',
            },
        ],
        // Length rules
        'max-len': [
            2,
            {
                code: 120,
                tabWidth: 2,
                comments: 120,
                ignoreComments: false,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        // React rules
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-uses-react': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-no-bind': [
            2,
            {
                ignoreDOMComponents: true,
                ignoreRefs: false,
                allowArrowFunctions: true,
                allowFunctions: false,
                allowBind: false,
            },
        ],
        'react/jsx-props-no-spreading': [0],
        'react/require-default-props': [0],
        'react-hooks/rules-of-hooks': [2],
        'react-hooks/exhaustive-deps': [1],
        'react/state-in-constructor': [0],
        'react/function-component-definition': [0],
        // JSX a11y rules
        'jsx-a11y/anchor-is-valid': [
            0,
            {
                components: ['a'],
                specialLink: ['href'],
            },
        ],
        'jsx-a11y/click-events-have-key-events': [0],
        'jsx-a11y/no-static-element-interactions': [0],
        // Redux toolkit rules
        'no-param-reassign': ['error', {props: false}],
        // Common rules
        '@typescript-eslint/semi': [2],
        '@typescript-eslint/no-shadow': 2,
        'no-shadow': 0,
        '@typescript-eslint/no-use-before-define': 2,
        'no-use-before-define': 0,
        '@typescript-eslint/no-unused-vars': [2, {ignoreRestSiblings: true}],
        'no-unused-vars': 0,
        'no-undef': 0,
        'no-bitwise': 0,
        'consistent-return': 0,
        'no-plusplus': 0,
    },
    overrides: [
        {
            files: ['.test.js', '.test.jsx'],
            rules: {
                'react/jsx-props-no-spreading': 0,
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
};
