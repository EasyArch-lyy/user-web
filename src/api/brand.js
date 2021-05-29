import http from './public'

export const getBrand = (brandId) => {
  return http.fetchGet(`/brand/detail/${brandId}`)
}

export const productList = (params) => {
  return http.fetchGet('/brand/productList', params)
}
// /detail/{brandId}
// 添加商品到购物车
// export const addCart = (params) => {
//   return http.fetchPost('/cart/add', params)
