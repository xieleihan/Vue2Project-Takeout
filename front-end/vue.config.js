const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/Vue2Project-Takeout/' : './',
  devServer: {
    open: true
  },
  // 禁止做eslint检查
  lintOnSave: false
})
