import http from './public'

// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/member/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/member/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('/member/checkLogin', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/member/register', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/member/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/member/updateheadimage', params)
}

// 获取用户收货地址
export const getReceiveAddress = () => {
  return http.fetchGet('/member/address/list')
}

// 添加用户收货地址
export const addReceiveAddress = (receiveMsg) => {
  return http.fetchPost('/member/address/add', receiveMsg)
}

// 删除收货地址
export const deleteReceiveAddress = (id) => {
  return http.fetchGet(`/member/address/${id}`)
}

// 修改收货地址
export const updateReceiveAddress = (id, receiveMsg) => {
  return http.fetchPost(`/member/address/${id}`, receiveMsg)
}

// 获取指定收货地址详情
export const getReceiveAddressMsg = (id) => {
  return http.fetchGet(`/member/address/${id}`)
}
