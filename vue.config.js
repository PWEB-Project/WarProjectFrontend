const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'http://localhost:8098',
    },
  transpileDependencies: [
    'vuetify'
  ]
})
