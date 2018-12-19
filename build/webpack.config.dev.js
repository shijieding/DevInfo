const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base.js')




let config
config = merge(baseConfig,{
  module:{
    rules:[
      {
        test:/\.css/,
        use:[
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer:{
    port:'8001',
    host:'0.0.0.0',
    overlay:{
      errors:true
    },
    headers:{'Access-Control-Allow-Origin':'*'},
    hot:true,
    /*proxy:{
      '/api':{
        target:'http://device.znswsse.com',
        changeOrigin:true,
        secure:false
      }
    }*/
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
})


module.exports = config;
