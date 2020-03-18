const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = {
    configureWebpack: {
        //使用cdn加速
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            'Axios':'axios'
        },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',   // 提示compression-webpack-plugin@3.0.0的话asset改为filename
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    },
    // 生产环境 sourceMap,防止看到源代码
    productionSourceMap: true,
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    // PWA 插件的选项。
    pwa: {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        port: 80,
        https: true,
        proxy: '', // string | Object
    },
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    // css的处理
    css: {
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
        requireModuleExtension: true,

        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
        // 默认生产环境下是 true，开发环境下是 false
        extract: false,
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap: false,
        //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
        loaderOptions: {
            css: {},
            less: {}
        }
    },
};
