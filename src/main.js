// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// webpack提供的特性，可以在js里面依赖样式
import './common/stylus/index.styl'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('points', function (val) {
  if (val && val.length > 30) { return val.slice(0, 30) + ' ...' }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // ES6语法的简写，template是组件的名字，APP.vue是根组件
  components: { App },
  // <App/>同<App></App>,一个模板字符串作为vue实例的标识使用，模板将会
  // 替换挂载的元素，即index.html里面的div id=app
  template: '<App/>'
})
