const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'



const config = {
  mode:process.env.NODE_ENV || 'production',
  target:'web',
  entry:path.join(__dirname,'../src/main.js'),
  output:{
    filename: "bundle.[hash:8].js",
    path:path.join(__dirname,'../dist')
  },
  module:{
    rules:[
      {
        test:/\.(vue|js|jsx)$/,
        loader:'eslint-loader',
        exclude:/node_modules/,
        enforce:'pre'   //预处理，首先eslint处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test:/\.jsx$/,
        loader:'babel-loader'
      },
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.(jpg|jpeg|png|svg|gif)/,
        use:{
          loader:'url-loader',
          options: {
            limit:1000,
            name:'img/[name]-[hash:4].[ext]',
            publicPath:'../'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:isDev?'"development"' : '"production"'
      }
    }),
    new HTMLPlugin({
      template:'index.html'
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = config;
