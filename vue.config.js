
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const env = process.env.NODE_ENV === 'development'
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

// 导出功能
module.exports = {
    // 保存时检查
    lintOnSave: true,
    // 运行环境：可以是开发环境或者运行环境
    /**
    * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    * 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
    * map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
    * */
    productionSourceMap: env,
    // 运行时编译
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
    runtimeCompiler: true,
    // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    transpileDependencies: [
        // 检测元素变化
        'resize-detector'
    ],

    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    configureWebpack: config => {
        //
        config.devtool = 'source-map'
        // 开发环境配置
        if (!env) {
            // 插件清空
            const plugins = []
            //
            plugins.push(
                // 压缩插件
                new CompressionWebpackPlugin({
                    algorithm (input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback)
                    },
                    compressionOptions: {
                        numiterations: 15
                    },
                    minRatio: 0.99,
                    test: productionGzipExtensions
                })
            )
            // 压缩算法插件
            plugins.push(
                new BrotliPlugin({
                    test: productionGzipExtensions,
                    minRatio: 0.99
                })
            )
            //
            config.plugins = [
                ...config.plugins,
                ...plugins
            ]
        }
    },

    // 用chainWebpack做webpack高级配置；包括对loader的添加，修改；以及插件的配置
    chainWebpack: config => {
        // 解析连接符号
        config.resolve.symlinks(false)
        // 删除
        config.plugins.delete('prefetch')
        // 解析别名
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('styles', resolve('src/assets/styles'))
            .set('images', resolve('src/assets/images'))
            .set('icons', resolve('src/assets/icons'))
            .set('assets', resolve('src/assets'))
            .set('router', resolve('src/router'))
            .set('store', resolve('src/store'))
            .set('utils', resolve('src/utils'))
            .set('views', resolve('src/views'))
            .set('api', resolve('src/api'))
            .set('mock', resolve('src/mock'))
    },

    // 为css/sass/less提供全局样式，以及全局变量
    css: {
        // 运行环境
        extract: !env,
        // 启用 CSS modules for all css / pre-processor files(v3用modules v4用requireModuleExtension)
        requireModuleExtension: true,
        // css预处理器配置
        loaderOptions: {
            // pass options to css-loader
            css: {
                // 模块
                modules: {
                    // 定义编译后.class定制哈希类名
                    localIdentName: '[local]_[hash:base64:8]'
                },
                // 编译后成驼峰格式
                localsConvention: 'camelCaseOnly'
            },
            // pass options to less-loader
            less: {
                // js启用
                javascriptEnabled: true
            }
        }
    },

    // less全局引入
    pluginOptions: {
        lintStyleOnBuild: false,
        stylelint: {
            fix: true,
            files: ['src/**/*.vue', 'src/assets/styles/*.l?(e|c)ss']
        }
    },

    // 服务端api代理
    devServer: {
        // proxy: 'http://47.114.38.228:9000'
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://47.114.38.228:9000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
