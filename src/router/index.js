import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/page/login')
const register = () => import('@/page/register')
const forgetPassword = () => import('@/page/forget_password')
const main = () => import('@/page/main')
const classify = () => import('@/page/classify')
const goods_list = () => import('@/page/goods_list')
const goods_detail = () => import('@/page/goods_detail')
const cart = () => import('@/page/cart')
const my = () => import('@/page/my')
const today_online = () => import('@/page/today_online')
const new_activity = () => import('@/page/new_activity')
const all_use = () => import('@/page/all_use')
const my_set = () => import('@/page/my_set')
const my_message = () => import('@/page/my_message')
const my_collect = () => import('@/page/my_collect')
const modify_name = () => import('@/page/modify_name')
const modify_date = () => import('@/page/modify_date')
const modify_password = () => import('@/page/modify_password')
const modify_head = () => import('@/page/modify_head')
const shop_application = () => import('@/page/shop_application')
const couponUnreceived = () => import('@/page/coupon_unreceived')
const couponMine = () => import('@/page/coupon_mine')
const couponRule = () => import('@/page/coupon_rule'   )
const couponChoose = () => import('@/page/coupon_choose')
const confirm_order = () => import('@/page/confirm_order')
const buyer_remind = () => import('@/page/buyer_remind')
const my_order = () => import('@/page/my_order')
const order_detail = () => import('@/page/order_detail')
const address = () => import('@/page/address')
const add_address = () => import('@/page/add_address')
const message_center = () => import('@/page/message_center')
const message_reminding = () => import('@/page/message_reminding')
const usually_qustion = () => import('@/page/usually_qustion')
const feed_back = () => import('@/page/feed_back')
const about_us = () => import('@/page/about_us')
const search_classify = () => import('@/page/search_classify')
const modify_success = () => import('@/page/modify_success')
const dian = () => import('@/page/dian')
Vue.use(Router)

export default new Router({
  base: '/ifood/',
  mode: 'history',
  routes: [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/login',
    name: 'login',
    component: login 
  },
  {
    path: '/dian',
    name: 'dian',
    component: dian 
  },
  {
    path: '/register',
    name: 'register',
    component: register 
  },
  {
    path: '/forget_password',
    name: 'forgetPassword',
    component: forgetPassword 
  },
  {
    path: '/classify',
    name: 'classify',
    component: classify 
  },
  {
    path: '/goods_list',
    name: 'goods_list',
    component: goods_list 
  },
  {
    path: '/goods_detail/:id',
    name: 'goods_detail',
    component: goods_detail 
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart 
  },
  {
    path: '/coupon_unreceived',
    name: 'couponUnreceived',
    component: couponUnreceived 
  },
  {
    path: '/coupon_mine',
    name: 'couponMine',
    component: couponMine 
  },
  {
    path: '/coupon_rule/:id',
    name: 'couponRule',
    component: couponRule
  },
  {
    path: '/coupon_choose',
    name: 'couponChoose',
    component: couponChoose 
  },
  {
    path: '/my',
    name: 'my',
    component: my 
  },
  {
    path: '/today_online',
    name: 'today_online',
    component: today_online 
  },
  {
    path: '/new_activity/:id',
    name: 'new_activity',
    component: new_activity 
  },
  {
    path: '/all_use',
    name: 'all_use',
    component: all_use 
  },
  {
    path: '/my_set',
    name: 'my_set',
    component: my_set 
  },
  {
    path: '/my_collect',
    name: 'my_collect',
    component: my_collect
  },
  {
    path: '/my_message',
    name: 'my_message',
    component: my_message 
  },
  {
    path: '/modify_name',
    name: 'modify_name',
    component: modify_name 
  },
  {
    path: '/modify_head',
    name: 'modify_head',
    component: modify_head 
  },
  {
    path: '/modify_date',
    name: 'modify_date',
    component: modify_date 
  },
  {
    path: '/modify_password',
    name: 'modify_password',
    component: modify_password 
  },
  {
    path: '/modify_head',
    name: 'modify_head',
    component: modify_head 
  },
  {
    path: '/shop_application',
    name: 'shop_application',
    component: shop_application 
  },
  {
    path: '/confirm_order',
    name: 'confirm_order',
    component: confirm_order 
  },
  {
    path: '/buyer_remind',
    name: 'buyer_remind',
    component: buyer_remind 
  },
  {
    path: '/my_order',
    name: 'my_order',
    component: my_order 
  },
  {
    path: '/order_detail',
    name: 'order_detail',
    component: order_detail 
  },
  {
    path: '/address',
    name: 'address',
    component: address 
  },
  {
    path: '/add_address',
    name: 'add_address',
    component: add_address 
  },
  {
    path: '/message_center',
    name: 'message_center',
    component: message_center 
  },
  {
    path: '/message_reminding',
    name: 'message_reminding',
    component: message_reminding 
  },
  {
    path: '/usually_qustion',
    name: 'usually_qustion',
    component: usually_qustion 
  },
  {
    path: '/feed_back',
    name: 'feed_back',
    component: feed_back 
  },
  {
    path: '/about_us',
    name: 'about_us',
    component: about_us 
  },
  {
    path: '/search_classify',
    name: 'search_classify',
    component: search_classify 
  },
  {
    path: '/modify_success',
    name: 'modify_success',
    component: modify_success 
  }
  ], 
})
