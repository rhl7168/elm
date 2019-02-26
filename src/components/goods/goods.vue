<template>
  <div class="goods">
    <!-- 左侧商品列表 -->
    <div class="goodslist wrapper" ref="wrapper">
      <ul>
        <li v-for="(item,index) in goodsList" :key="index" @click="getGoodsContent(index,$event)" :class="{current:currentIndex === index}">
          <span class="align">
            <span v-show="item.type > 0" :class="iconArr[item.type]" class="icon"></span>
            <span>{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <!-- 右侧商品详情 -->
    <div class="goodscontent asidewrapper" ref="asidewrapper">
      <div>
        <div class="list-content content" v-for="(item,index) in goodsList" :key="index" ref="listContent">
          <div class="list-name">{{item.name}}</div>
          <div class="list-details">
            <ul>
              <li v-for="(val,index) in item.foods" :key="index" style="font-size:0" class="clear">
                <div class="left-img" style="float:left; margin-right:8px">
                  <img :src="val.icon" alt="" style="height:60px">
                </div>
                <div style="float:left">
                  <div style="font-size:14px; color:rgb(7,17,27); line-height:14px; font-weight:bold; margin:2px 0px 8px 0px">{{val.name}}</div>
                  <div v-if="val.description" style="font-size:10px; color:rgb(147,153,159); line-height:10px">{{val.description}}</div>
                  <div style="font-size:10px; color:rgb(147,153,159); line-height:10px; margin:8px 0px 0px 0px">
                    <span style="margin-right:12px">月售{{val.sellCount}}</span>
                    <span>好评率{{val.rating}}%</span>
                  </div>
                  <div>
                    <span style="font-size:14px; color:#f01414; line-height:24px; font-weight:bold; margin-right:8px">￥{{val.price}}</span>
                    <span style="font-size:10px; color:rgb(147,153,159); line-height:24px; font-weight:bold" v-if="val.oldPrice">￥{{val.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      goodsList: [],
      // 右侧每个事物列表的高度
      listHeight: [],
      // 右侧事物列表滚动的高度
      scrollY: 0,
      isfixed: false
    }
  },
  created () {
    this.iconArr = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods')
      .then((res) => {
        this.goodsList = res.data.data
        console.log(this.goodsList)
        this.$nextTick(() => {
          this.handleScroll()
          this.calculateHeight()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    getGoodsContent (i, event) {
      if (!event._constructed) {
        return
      }
      let el = this.$refs.listContent[i]
      this.asideWrapperScroll.scrollToElement(el, 300)
    },
    handleScroll () {
      this.wrapperScroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
      this.asideWrapperScroll = new BScroll(this.$refs.asidewrapper, {
        click: true,
        probeType: 3
      })
      this.asideWrapperScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算右侧每一个分类的高度的值并放进数组listHeight
    calculateHeight () {
      let listContent = this.$refs.listContent
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < listContent.length; i++) {
        height += listContent[i].clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.goods
  width 100%
  display flex
  position absolute
  top 177px
  bottom 0
  overflow hidden
.goodslist
  width 80px
  font-size 12px
  color rgb(77,85,93)
  font-weight 200
  background-color #f3f5f7
  ul
    width 100%
    li
      width 100%
      height 54px
      padding 0 12px 0 12px
      box-sizing border-box
      line-height 14px
      display table
      .align
        display table-cell
        vertical-align middle
        span
          vertical-align middle
        .icon
          width 12px
          height 12px
          vertical-align middle
          display inline-block
          background-size 12px 12px
          background-repeat no-repeat
        .special
          bg-img('../../assets/img/special_3')
        .decrease
          bg-img('../../assets/img/decrease_3')
        .discount
          bg-img('../../assets/img/discount_3')
        .invoice
          bg-img('../../assets/img/invoice_3')
        .guarantee
          bg-img('../../assets/img/guarantee_3')
.goodslist
  .current
    background-color #fff
    font-weight bold
// 右侧商品详情
.goodscontent
    // width 100%
    flex 1
  .list-name
    width 100%
    height 26px
    line-height 26px
    font-size 12px
    color rgb(147,153,159)
    border-left 1px solid #d9dde1
    padding-left 18px
    background-color #f3f5f7
  .list-details
    li
      padding 18px 18px 18px 18px
</style>
