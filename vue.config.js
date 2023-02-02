const {defineConfig} = require('@vue/cli-service')
// const path = require('path')

// const resolve = (dir) => {
//     return path.join(__dirname, dir)
// }

const resolve = require("path").resolve;

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    chainWebpack(config){
        //引入图标
        config.module.rule("svg").exclude.add(resolve("./src/assets/icon/svg"));
        config.module.rule("icon").test(/\.svg$/)
            .include.add(resolve("./src/assets/icon/svg")).end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId:'icon-[name]'
            });
    }
})
