import axios from 'axios'  //引入axios

import router from '@/router'  //引入router

import Vue from "vue"

let instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token  //请求头加上token
      
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
  
  // http response 拦截器
  instance.interceptors.response.use(
    response => {
		
      if(response.status!=200){
        Vue.prototype.$message("请求失败，稍后重试")
      }
      //拦截响应，做统一处理 
      if (response.data.Ret) {
        switch (response.data.Ret) {
          case -8:
					setTimeout(()=>{
						router.replace({
						  path: 'login',
						  query: {
						    redirect: router.currentRoute.fullPath
						  }
						})
					},1000)
           
        }
      }
      return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })
	
 export default instance