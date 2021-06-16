module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: "eslint:recommended",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: [
        "react"
    ],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    plugins: [
        "react"
    ],
    rules: {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off", // Allow log statements
        "react/display-name": "off", // Allow anonymous components
        "react/jsx-max-props-per-line": 1,
        "react/no-string-refs": "off",
        "react/no-unescaped-entities": "off",
    },
    settings: {
        react: {
            version: "detect",
        }
    }
};
