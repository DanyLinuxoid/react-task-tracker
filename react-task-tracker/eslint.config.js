import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        ...reactPlugin.configs.flat.recommended,
        ...reactPlugin.configs.flat['jsx-runtime'], 
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser, 
            },
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        settings: {
            react: {
                version: 'detect', 
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            'react/jsx-no-target-blank': 'off', 
            'react/jsx-key': 'error', 
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
];