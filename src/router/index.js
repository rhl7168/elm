import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Goods from '@/components/goods/goods'
import Comment from '@/components/comment/comment'
import Merchant from '@/components/merchant/merchant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    }, {
      path: '/comment',
      name: 'comment',
      component: Comment
    }, {
      path: '/merchant',
      name: 'merchant',
      component: Merchant
    }, {
      path: '/',
      redirect: '/goods'
    }
  ]
})
