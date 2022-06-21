import request from '@/utils/request'
//关键词相关服务

var host_name = ""
if (process.env.NODE_ENV=="development") {
  host_name = "http://rest.kkyx.shop/"
} else {
  host_name = "http://rest.kkyx.shop/"
}

//搜索关键词
export function get_word_search(params) {
  return request({
    url: host_name + 'word/get_word_search',
    method: 'get',
    params
  })
}

//商品覆盖搜索词
export function get_goods_words(params) {
  return request({
    url: host_name + 'word/get_goods_words',
    method: 'get',
    params
  })
}
