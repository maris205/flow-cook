import request from '@/utils/request'
//ai相关服务，主要是以图搜图

var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://rest.kkyx.shop/"
} else {
  host_name = "http://rest.kkyx.shop/"
}

//以图搜图
export function search_pic(params) {
  return request({
    url: host_name + 'image_ai/search_pic',
    method: 'get',
    params
  })
}

//关键词搜索
export function search_goods(params) {
  return request({
    url: host_name + 'image_ai/search_goods',
    method: 'get',
    params
  })
}

//关键词搜索
export function search_1688_goods(params) {
  return request({
    url: host_name + 'image_ai/search_1688_goods',
    method: 'get',
    params
  })
}

//用户关键词搜索
export function search_user_goods(params) {
  return request({
    url: host_name + 'image_ai/search_user_goods',
    method: 'get',
    params
  })
}


//获得用户图片详情列表
export function get_user_goods(params) {
  return request({
    url: host_name + 'image_ai/get_user_goods',
    method: 'get',
    params
  })
}
