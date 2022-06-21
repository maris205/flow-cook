import request from '@/utils/request'
//商品相关服务，主要是选品

var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://rest.kkyx.shop/"
} else {
  host_name = "http://rest.kkyx.shop/"
}

//获得商品类别
export function get_goods_category() {
  return request({
    url: host_name + 'goods/get_goods_category',
    method: 'get',
  })
}

//获得商品类别榜单
export function get_category_goods_rank(params) {
  return request({
    url: host_name + 'goods/get_category_goods_rank',
    method: 'get',
    params
  })
}

//获得bsr榜单
export function get_best_seller_rank(params) {
  return request({
    url: host_name + 'goods/get_best_seller_rank',
    method: 'get',
    params
  })
}


