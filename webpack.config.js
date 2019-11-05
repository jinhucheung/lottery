'use strict';

const copyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue
module.exports = {
  plugins: [
    {
      imagemini: false
    },
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'app/public/images'),
        to: 'images'
      }
    ])
  ]
};