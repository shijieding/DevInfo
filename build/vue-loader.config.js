
module.exports = (isDev) => {
  return {
    preserveWhitepace:true,     //过滤html字符串后面的空格
    extractCSS:false,         //把vue里面的css也单独打包
    cssModules:{
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true     //把hello-world 变成helloWorld
    }
    // hotReload:false,            //热重载，根据环境变量生成
/*    loaders:{                 //自定义模块 loader
      'docs':docsLoader
    },*/
  }
}
