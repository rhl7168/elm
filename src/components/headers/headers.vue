<template>
  <div class="back-head">
    <img :src="seller.avatar" alt="" class="back">
    <div class="header clear">
      <div class="logo">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="right-store-info">
        <div class="store-name">
          <span></span>
          <span>{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}</div>
        <div class="support">
          <span></span>
          <span v-if="seller.supports">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="notice">
      <span></span>
      <span>{{seller.bulletin | points}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seller: {}
    }
  },
  mounted () {
    this.$http.get('/api/seller')
      .then((res) => {
        this.seller = res.data.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.back-head
  position relative
  overflow hidden
  .back
    position absolute
    top -80px
    left 0px
    z-index -1
    width 100%
    height 208%
    filter blur(5px)
.header
  background-color:rgba(7,17,27,0.5)
  .logo
    float left
    img
      width 64px
      margin 24px 16px 18px 24px
      border-radius 2px
.right-store-info
  float left
  margin-top 26px
  color rgb(255,255,255)
  .store-name
    span:nth-child(1)
      width 30px
      height 18px
      vertical-align top
      display inline-block
      bg-img('../../assets/img/brand')
      background-size 30px 18px
      background-repeat no-repeat
    span:nth-child(2)
      font-size 16px
      font-weight bold
      line-height 18px
      margin-left 6px
  .description
      font-size 12px
      font-weight 200
      line-height 12px
      margin-top 8px
  .support
    margin-top 10px
    span:nth-child(1)
      width 12px
      height 12px
      vertical-align top
      display inline-block
      bg-img('../../assets/img/decrease_1')
      background-size 12px 12px
      background-repeat no-repeat
    span:nth-child(2)
      vertical-align top
      font-size 10px
      font-weight 200
      line-height 12px
.notice
  background-color rgba(7,17,27,0.6)
  height 28px
  color rgb(255,255,255)
  font-weight 200
  line-height 28px
  padding 0 12px 0 12px
  font-size 0
  span:nth-child(1)
    width 22px
    height 12px
    display inline-block
    bg-img('../../assets/img/bulletin')
    background-size 22px 12px
    background-repeat no-repeat
    margin-right 4px
    vertical-align middle
  span:nth-child(2)
    vertical-align middle
    margin-right 4px
    font-size 10px
  span:nth-child(3)
    font-size 10px
    vertical-align middle
</style>
