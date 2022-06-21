import request from '@/utils/request'

//用户相关服务
var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://api.cata.show/"
} else {
  host_name = "http://api.cata.show/"
}


//用户登录
export function login(params) {
  return request({
    url:  host_name + 'user/login',
    method: 'get',
    params
  })
}

//用户注册
export function reg_user(params) {
  return request({
    url:  host_name + 'user/reg_user',
    method: 'get',
    params
  })
}
