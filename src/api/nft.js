import request from '@/utils/request'

//用户相关服务
var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://api.cata.show/"
} else {
  host_name = "http://api.cata.show/"
}

//发布nft
export function publish_nft(params) {
  return request({
    url: host_name + 'user_nft/publish_nft',
    method: 'get',
    params
  })
}

//获得用户图片列表
export function get_user_nft_list(params) {
  return request({
    url: host_name + 'user_nft/get_user_nft_list',
    method: 'get',
    params
  })
}


//获得用户图片详情
export function get_user_nft(params) {
  return request({
    url: host_name + 'user_file/get_user_file',
    method: 'get',
    params
  })
}
