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

// 获取购物车内包含促销信息
export const listPromotion = (ids) => {
  return http.fetchGet('/cart/list/promotion', ids)
}

// 修改购物车某个商品数量
// 参数： 购物车id，数量quantity
export const updateQuantity = (params) => {
  return http.fetchGet('/cart/update/quantity', params)
}

// 清空购物车
export const clear = () => {
  return http.fetchPost('/cart/clear')
}
