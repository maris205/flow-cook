import request from '@/utils/request'
//工具箱相关的

var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://rest.kkyx.shop/"
} else {
  host_name = "http://rest.kkyx.shop/"
}

//类别内销量预估
export function predict_sales(params) {
  return request({
    url: host_name + 'tools_box/predict_sales',
    method: 'get',
    params
  })
}

//list评级
export function get_listing_level(params) {
  return request({
    url: host_name + 'tools_box/get_listing_level',
    method: 'get',
    params
  })
}


