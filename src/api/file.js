import request from '@/utils/request'

//用户相关服务
var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://api.cata.show/"
} else {
  host_name = "http://api.cata.show/"
}

//上传图片
export function upload_image(data) {
  return request({
    url:  host_name + 'user_file/upload_user_file',
    method: 'post',
    data
  })
}

//获得用户图片列表
export function get_user_file_list(params) {
  return request({
    url: host_name + 'user_file/get_user_file_list',
    method: 'get',
    params
  })
}


//获得用户图片详情
export function get_user_file(params) {
  return request({
    url: host_name + 'user_file/get_user_file',
    method: 'get',
    params
  })
}
