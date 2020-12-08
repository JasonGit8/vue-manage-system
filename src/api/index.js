import request from '@/utils/request'
/*
 * post请求两种参数 
 *  params  url拼接方式请求
 *  data    对象形式请求
 */
export const getIndexData = (query) => {
  return request({
    url: `url地址`,
    method: 'get',
    params: query
  })
}

export const getIndexDatas = (query) => {
  return request({
    url: `/web/v2/getTradingInfo.mvc`,
    method: 'post',
    data: query
  })
}
