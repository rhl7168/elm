<template>
  <div id="app">
    <Header></Header>
    <div ref="tab" :class="{isfixed:tabfixed}">
      <div class="tab border-1px">
        <router-link class="tab-item" to="/goods">商品</router-link>
        <router-link class="tab-item" to="/comment">评价</router-link>
        <router-link class="tab-item" to="/merchant">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/headers/headers'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      tabfixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset
      var offsetTop = this.$refs.tab.offsetTop
      scrollTop > offsetTop ? this.tabfixed = true : this.tabfixed = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
.isfixed
  position fixed
  top 0
  left 0
  z-index 100
  color red
  background-color #fff
  width 100%
.tab
  display: flex
  width:100%
  height:40px
  line-height:40px
  justify-content:center
  border-1px(rgba(7,17,21,0.1))
.tab-item
  flex:auto
  text-align: center
  font-size:14px
  color:rgb(77,85,93)
.router-link-active
  color:rgb(240,20,20)
</style>
