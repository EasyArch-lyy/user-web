import http from './public'

// 综合筛选
export const categoryFilter = (params) => {
  return http.fetchGet('/product/search', params)
}

// 树型获取商品分类
export const categoryTreeList = () => {
  return http.fetchGet('/product/categoryTreeList')
}

export const categoryList = (id) => {
  return http.fetchGet(`/categoryList/${id}`)
}

// 根据id获取商品详情
export const categoryDetail = (param) => {
  return http.fetchGet(`/product/${param}`)
}
