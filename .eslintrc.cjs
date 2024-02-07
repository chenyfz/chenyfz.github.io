module.exports = {
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    rules: {
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 3
            },
            "multiline": {
                "max": 1
            }
        }],
        "vue/singleline-html-element-content-newline": ["off"]
    }
}