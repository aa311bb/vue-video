module.exports = {
  // pabulicPath:process.env.NODE_ENV === 'production' ? '' : '',
  devServer:{

      proxy:{ //配置跨域
          '/api':{
              target:'https://app.vmovier.com/',
              ws:true,
              changeOrigin:true,//允许跨域
              pathRewrie:{
                  '^/api':'https://app.vmovier.com/'   //请求的时候使用这个api就可以
              }
          }
      }
  }
}
