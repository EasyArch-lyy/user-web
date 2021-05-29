import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Login = () => import('/page/Login/login.vue')
const Register = () => import('/page/Login/register.vue')
const Home = () => import('/page/Home/home.vue')
const checkout = () => import('/page/Checkout/checkout.vue')
// const payment = () => import('/page/Order/payment.vue')
// const paysuccess = () => import('/page/Order/paysuccess.vue')
// const Search = () => import('/page/Search/search.vue')
// const RefreshSearch = () => import('/page/Refresh/refreshsearch.vue')
// const RefreshGoods = () => import('/page/Refresh/refreshgoods.vue')
// const orderDetail = () => import('/page/User/children/orderDetail.vue')
// const Alipay = () => import('/page/Order/alipay.vue')
// const Wechat = () => import('/page/Order/wechat.vue')
const Pms = () => import('/page/Pms/product/index.vue')
// const SearchProduct = () => import('/page/SearchProduct/searchProduct.vue')
// const Brand = () => import('/page/Pms/brand/index.vue')
const PmsDetails = () => import('/page/Pms/product/item/productDetail.vue')
const User = () => import('/page/User/user.vue')
const Order = () => import('/page/Order/order.vue')
const ReceiveAddress = () => import('/page/User/children/addressList.vue')
const Information = () => import('/page/User/children/information.vue')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {path: 'home', component: Home}
      ]
    },
    {path: '/pms',
      name: 'pms',
      component: Pms
      // children: [
      //   {path: '/pmsDetails', name: 'pmsDetails', component: PmsDetails}
      // ]
    },
    {path: '/pmsDetails', name: 'pmsDetails', component: PmsDetails},
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    // {path: '/order',}
    // {path: '/cart', name: 'cart', component: Cart},
    // {path: '/refreshsearch', name: 'refreshsearch', component: RefreshSearch},
    // {
    //   path: '/order',
    //   name: 'order',
    //   component: order,
    //   children: [
    //     {path: 'paysuccess', name: 'paysuccess', component: paysuccess},
    //     {path: 'payment', name: 'payment', component: payment},
    //     {path: '/search', name: 'search', component: Search},
    //     {path: 'alipay', name: 'alipay', component: Alipay},
    //     {path: 'wechat', name: 'wechat', component: Wechat}
    //   ]
    // },
    {
      path: '/user',
      name: 'user',
      component: User,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: '订单列表', component: Order},
        // {path: 'orderDetail', name: '订单详情', component: orderDetail},
        {path: 'information', name: '账户资料', component: Information},
        {path: 'addressList', name: '收货地址', component: ReceiveAddress}
        // {path: 'coupon', name: '我的优惠', component: coupon},
        // {path: 'support', name: '售后服务', component: support},
        // {path: 'aihuishou', name: '以旧换新', component: aihuishou}
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})
