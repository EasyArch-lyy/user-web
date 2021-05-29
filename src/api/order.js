import http from './public'

// export const getBrand = (brandId) => {
//   return http.fetchGet(`/brand/detail/${brandId}`)
//  }
// 生成订单确认信息
export const generateConfirmOrder = (ids) => {
  return http.fetchPost('/order/generateConfirmOrder', ids)
}

// 生成订单
export const generateOrder = (orderParam) => {
  return http.fetchPost('/order/generateOrder', orderParam)
}

// 自动取消支付超时订单
export const cancelTimeOutOrder = () => {
  return http.fetchGet('/order/cancelTimeOutOrder')
}

// 支付成功后回调
// 参数 orderId  payType
export const paySuccess = (params) => {
  return http.fetchPost('/order/paySuccess', params)
}

// 根据id获取订单详情
export const orderDetail = (orderId) => {
  return http.fetchGet(`/order/${orderId}`)
}

// 用户取消订单
export const cancelOrder = (orderId) => {
  return http.fetchGet('/order/cancelUserOrder', orderId)
}

// 用户确认收货
export const confirmReceiveOrder = (orderId) => {
  return http.fetchGet('/order/confirmReceiveOrder', orderId)
}

// 用户删除订单
export const deleteOrder = (orderId) => {
  return http.fetchGet('/order/deleteOrder', orderId)
}

// 根据条件获取订单
// 参数： "status", value = "订单状态：-1->全部；0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭",
//   pageNum
//   pageSize
export const getOrderListByTerm = (params) => {
  return http.fetchGet('/order/list', params)
}
