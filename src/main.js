import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import { userInfo } from './api/user'
import { Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option } from 'element-ui'
import { getStore } from './utils/storage'
import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/home', '/pms', '/login', '/register'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let params = {
    params: {
      token: getStore('token')
    }
  }
  userInfo(params).then(res => {
    if (res.data.state !== 1) { // 没登录
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        next()
      } else {
        next('/login')
      }
    } else {
      // {
      //     "code":200,
      //     "message":"操作成功",
      //     "data":{
      //         "id":10,
      //         "memberLevelId":4,
      //         "username":"jinxiu",
      //         "password":"$2a$10$7OfXTQc0DfHkgvw1mf59CObhNmL9aYryfF4ib9og/JuQ17DAvWROW",
      //         "phone":"18522015989",
      //         "status":1,
      //         "createTime":"2021-05-26T07:40:21.000+00:00",
      //         "icon":"https://jinxiumall.oss-cn-beijing.aliyuncs.com/mall/images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210223100724.jpg
      // ",
      //         "state":1,
      //         "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaW54aXUiLCJjcmVhdGVkIjoxNjIyMjcxMjkzODkwLCJleHAiOjE2MjI4NzYwOTN9.0HisdjkwtrtQ3AfYqoExkmqQtOiLChT_8BfxRFtlQiEd6iWtskFQ2FjL0MfR_I6c45odSvBO2zovOAcKqq2nvw",
      //         "message":"用户登录成功"
      //     }
      // }
      store.commit('RECORD_USERINFO', {info: res.data})
      if (to.path === '/login') { //  跳转到
        next({path: '/'})
      }
      next()
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
