import http from './public'

// 添加商品到购物车
export const addCart = (params) => {
  return http.fetchPost('/cart/add', params)
}

// 获取某个会员的购物车列表
export const cartList = () => {
  return http.fetchGet('/cart/list')
}

// 从购物车删除商品
export const deleteCart = (ids) => {
  return http.fetchGet('/cart/delete', ids)
}
