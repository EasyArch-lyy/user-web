import http from './public'

// 搜索框搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('/esProduct/search/simple')
}
// keyword
