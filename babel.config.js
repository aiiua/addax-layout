module.exports = {
    // 预设
    presets: [
        [
            '@vue/app',
            {
                useBuiltIns: 'entry',
                polyfills: [
                    'es6.promise',
                    'es6.symbol'
                ],
                modules: 'commonjs'
            }
        ]
    ],
    // 插件
    plugins: [
        [
            'import',
            {
                libraryName: 'view-design',
                libraryDirectory: 'src/components'
            }
        ]
    ]
}
