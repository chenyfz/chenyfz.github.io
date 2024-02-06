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
        'semi': ['error', 'never']
    }
}