module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
            },
        },
    },
    // 项目打包时不要map文件
    productionSourceMap: false
}