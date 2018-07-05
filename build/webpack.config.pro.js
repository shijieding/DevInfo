const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")



let config
config = merge(baseConfig,{
  entry:{
    app:path.join(__dirname,'../src/main.js')
  },
  output:{
    filename:'js/[name].[chunkhash:8].js'
  },
  module:{
    rules:[
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          "stylus-loader"
        ]
      },
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "css/[id].css"
    })
  ],
  optimization:{                  //第三方库单独打包
    splitChunks: {
      chunks:'all'
    },
    runtimeChunk:true
  }
})


module.exports = config;
