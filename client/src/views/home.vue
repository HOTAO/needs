<template>
  <div id="home">
    <div class="header">
      <div class="logo">极豆科技</div>
      <div class="search">搜索</div>
    </div>
    <div class="tabs">
      <div class="tab">
        <div class="tab-item">进行</div>
      </div>
      <div class="tab">
        <div class="tab-item">等待</div>
      </div>
      <div class="tab">
        <div class="tab-item">暂缓</div>
      </div>
      <div class="tab">
        <div class="tab-item">全部</div>
      </div>
    </div>
    <div class="list">
      <div v-for="need in needs" :key="need.id">
        <a class="list-item" :href="need.path" target="_black">
          <div class="left">
            <div class="title">【原型】{{need.name}}</div>
            <div class="time">{{need.create_time}}</div>
          </div>
          <div class="right">
            <div class="type">
              <span class="type-color" :style="{backgroundColor: _typeColor(need.type).color}"></span>
              {{_typeColor(need.type).text}}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api/index.js'
export default {
  name: 'home',
  data() {
    return {
      needs: []
    }
  },
  created() {
    this._getNeeds()
  },
  methods: {
    _getNeeds() {
      // this.
      const params = {
        status: 1
      }
      api
        .getNeeds(params)
        .then(res => {
          this.needs = res
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    _typeColor(value) {
      switch (value) {
        case 1:
          return {
            color: '#e981fb',
            text: '网页端'
          }
        case 2:
          return {
            color: '#0757ff',
            text: '后端'
          }
        case 3:
          return {
            color: '#fcca86',
            text: 'Android'
          }
        case 4:
          return {
            color: '#86b0fe',
            text: 'iOS'
          }
        case 5:
          return {
            color: '#06bsd7',
            text: '小程序'
          }
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#home
  .header
    display flex
    justify-content space-between
    align-items center
    height 60px
    width 900px
    margin 0 auto
  .tabs
    display flex
    justify-content center
    align-items center
    height 60px
    background #1c1d1f
    .tab
      color white
      padding 0 30px
      font-size 16px
      line-height @font-size
      &:not(:last-child)
        border-right 1px solid white
      &:hover
        font-size 20px
        padding 0 26px
        >div
          &:before
            display block
    .tab-item
      position relative
      &:before
        content ''
        display none
        position absolute
        width 100%
        height 3px
        background-color white
        bottom -22px
  .list
    width 900px
    margin 48px auto
    .list-item
      display flex
      justify-content space-between
      align-items center
      height 90px
      padding 40px
      margin-bottom 20px
      background-color #fafbfc
    .title
      font-size 16px
      color #1c1d1f
    .time
      font-size 14px
      color #a8a8a8
      margin-top 14px
    .type-color
      display inline-block
      width 8px
      height @width
      border-radius 50%
      background-color #e981fb
    .type
      width 70px
      text-align left
      font-size 14px
      color #7a7a7a
</style>
