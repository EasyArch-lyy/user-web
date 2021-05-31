import axios from 'axios'
axios.defaults.timeout = 10000
axios.defaults.token =
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchGetHeader (url, params = {}, config) {
    return new Promise((resolve, reject) => {
      axios.get(url, params, config).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPostHeader (url, params = {}, config) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, config).then(res => {
        resolve(res.data)
      }).cache(error => {
        reject(error)
      })
    })
  }
}
