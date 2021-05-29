import http from './public'

// 首页信息获取接口
export const productHome = (params) => {
  return http.fetchGet('/home/content', params)
}

