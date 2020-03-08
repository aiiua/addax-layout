module.exports = {
    root: true,
    env: {
        node: true
    },
    // 扩展
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    // 规则
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
    },
    // 解析设置
    parserOptions: {
        parser: 'babel-eslint'
    }
}
