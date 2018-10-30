<template>
  <div id="home">
    <div class="header">
      <div class="logo">
        <img src="~@/assets/logo.png" alt="">
        <a @click="_goBackstage">后台管理</a>
      </div>
      <div class="search">
        <el-input ref="search" @blur="search.long = false" @keyup.enter.native="_search" :class="{force: search.long}" @focus="search.long = true" suffix-icon="el-icon-search" placeholder="请输入内容" v-model="search.value">
        </el-input>
      </div>
    </div>
    <div class="tabs">
      <div v-for="(tab,index) in tabs" :key="tab" :class="[params.witchTab === index ? 'tab active':'tab']" @click="_handleTabChange(index)">
        <div class="tab-item">{{tab}}</div>
      </div>
    </div>
    <div class="list">
      <transition name="fade">
        <p class="list-item" v-show="needsInfo.count<=0">都没上传，哪来的需求，不要瞎鸡儿搞事。不然我TM反手就是一......张过去的CD</p>
      </transition>
      <transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="_beforeEnter" v-on:enter="_enter" v-on:leave="_leave">
        <div v-for="(need, index) in needsInfo.list" data-aa="你好" :data-index="index" :key="need.id">
          <div class="list-item" @click="_openDialog(need)">
            <div class="left">
              <div class="title">{{need.name}}</div>
              <div class="time">{{need.create_time}}</div>
            </div>
            <div class="right">
              <div class="type" v-for="classify in JSON.parse(need.classifys)" :key="classify">
                <span class="type-color" :style="{backgroundColor: _typeColor(classify).color}"></span>
                {{_typeColor(classify).text}}
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <el-pagination v-show="needsInfo.count>0" class="pagintion" background layout="prev, pager, next" @current-change="_handleCurrentChange" :current-page="params.page" :page-size="params.pageSize" :total="needsInfo.count">
    </el-pagination>
    <el-dialog class="dialog" title="选择你要查看的内容" :visible.sync="isDialogOpen">
      <div class="dialog-content">
        <div class="left">
          <h1>在线看</h1>
          <div class="online-btn">
            <el-button :disabled="!need.path" @click="_openNewWindow(need.path)" round>原型</el-button>
            <el-button class="border-btn" :disabled="!need.wordPath" @click="_openNewWindow(need.wordPath)" round>需求文档</el-button>
          </div>
        </div>
        <div class="right">
          <h1>下载</h1>
          <el-button class="border-btn" :disabled="!need.downloadPath" @click="_openNewWindow(need.downloadPath, true)" round>下载文件</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="dialog login-dialog" title="登录" :visible.sync="isLogin">
      <el-form class="login-form" :model="user" label-width="70px" ref="login">
        <el-form-item label="账号：" prop="name" :error="error.name" :rules="[
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]">
          <el-input v-model="user.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" :error="error.password" :rules="{required: true, message: '密码不能为空', trigger: 'blur'}">
          <el-input type="password" v-model="user.password" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import api from '../api/index.js'
import cache from '../cache/index.js'
import Velocity from 'velocity-animate'
export default {
  name: 'home',
  data() {
    return {
      patternPhone: /^13[0-9]{1}[0-9]{8}$|^16[6]{1}[0-9]{8}$|^19[89]{1}[0-9]{8}$|^15[012356789]{1}[0-9]{8}$|^17[012356789]{1}[0-9]{8}$|^18[0-9]{1}[0-9]{8}$|^14[57]{1}[0-9]{8}$/,
      user: {
        name: '',
        password: ''
      },
      error: {
        name: '',
        password: ''
      },
      canSee: false,
      search: {
        value: '',
        long: false
      },
      isLogin: false,
      isDialogOpen: false,
      needsInfo: [],
      tabs: ['进行', '等待', '暂缓', '全部'],
      need: {}
    }
  },
  computed: {
    params() {
      return {
        witchTab: Number(this.$route.query.tab) || 0,
        page: Number(this.$route.query.page) || 1,
        pageSize: 10
      }
    }
  },
  async created() {
    await this._getNeeds()
  },
  methods: {
    _beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    _enter(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el, { opacity: 1, height: '6.875em' }, { complete: done })
      }, delay)
    },
    _leave(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function() {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done })
      }, delay)
    },
    _goBackstage() {
      if (cache.lsCache.get('userInfo')) {
        this.$router.push({ name: 'manager' })
      } else {
        this.isLogin = true
      }
    },
    _login() {
      this.$refs.login.validate(valid => {
        if (valid) {
          api
            .login(this.user)
            .then(res => {
              console.log(res)
              cache.lsCache.set('token', res.authInfo.token, res.authInfo.exp)
              cache.lsCache.set('userInfo', res.userInfo.data, res.authInfo.exp)
              this.$router.push({ name: 'manager' })
            })
            .catch(err => {
              console.log(err)
              this.error.password = err.data.message
            })
        }
      })
    },
    _search() {
      // this.search.long = false
      this._getNeeds()
    },
    _openNewWindow(path, boolen = false) {
      if (!boolen) {
        const newWindew = window.open()
        newWindew.location = path
      } else {
        window.location = path
      }
    },
    _openDialog(need) {
      console.log(arguments[0])
      this.isDialogOpen = true
      this.need = need
    },
    _handleCurrentChange(page) {
      this.$router.push({ query: { page, tab: this.params.witchTab } })
      this._getNeeds()
    },
    _handleTabChange(index) {
      this.search.value = ''
      this.params.witchTab = index
      this.$router.push({ query: { page: 1, tab: this.params.witchTab } })
      this._getNeeds()
    },
    _getNeeds() {
      const params = {
        status: this.params.witchTab !== 3 ? this.params.witchTab + 1 : '',
        keyword: this.search.value,
        page: this.params.page,
        pageSize: this.params.pageSize
      }
      api
        .getNeeds(params)
        .then(res => {
          this.needsInfo = res
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    _classifyColor(value) {},
    _typeColor(value) {
      switch (value) {
        case 1:
          return {
            color: '#0757ff',
            text: '后端'
          }
        case 2:
          return {
            color: '#06b5d7',
            text: '小程序'
          }
        case 3:
          return {
            color: '#e981fb',
            text: 'WAP'
          }
        case 4:
          return {
            color: '#fcca86',
            text: 'Android'
          }
        case 5:
          return {
            color: '#86b0fe',
            text: 'iOS'
          }
        case 6: {
          return {
            color: '#ff7461',
            text: 'web'
          }
        }
        default:
          return {
            color: '#e981fb',
            text: '网页端'
          }
        // break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
$width = 860px
.list-item
  display inline-block
  margin-right 10px
  // transition all 1s
.list-enter-active
  transition all 1s
.list-leave-active
  transition all 1s
.fade-enter-active, .fade-leave-active
  transition all 1s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
  margin-top -110px
// .list-leave-active
// position absolute
.list-leave-to
  opacity 0
  transform translateY(90px)
.list-enter
  opacity 0
  transform translateY(90px)
// .list-move
// transition transform 1s
#home
  .header
    display flex
    justify-content space-between
    align-items center
    height 60px
    width $width
    margin 0 auto
    .logo
      img
        height 24px
      a
        position relative
        font-size 16px
        color #7a7a7a
        font-weight bold
        padding-left 14px
        margin-left 14px
        cursor pointer
        &:after
          content ''
          position absolute
          width 3px
          height @width
          background-color #7a7a7a
          top 0
          bottom 0
          left 0
          margin auto
    .search
      .force
        >>>.el-input__inner
          width 277px
      >>>.el-input__inner
        border 0
        background transparent
        transition all 1s
        width 177px
        font-size 14px
        color #a8a8a8
  .tabs
    display flex
    justify-content center
    align-items center
    height 60px
    width 100%
    background #1c1d1f
    .tab
      position relative
      color white
      padding 0 30px
      font-size 16px
      height 60px
      line-height @height
      cursor pointer
      transition 0.5s
      &:hover
        font-size 20px
        font-weight bold
        padding 0 26px
      &:not(:last-child)
        &:after
          // content ''
          position absolute
          width 1px
          height 16px
          background-color white
          right 0
          top 22px
    .active
      font-size 20px
      font-weight bold
      padding 0 26px
    .active
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
        bottom 0
  .list
    width $width
    padding 48px 0
    margin auto
    overflow-y hidden
    .list-item
      display flex
      justify-content space-between
      align-items center
      height 90px
      padding 40px
      margin-bottom 20px
      background-color white
      cursor pointer
      transition 1s
      &:hover
        background #efefef
    .right
      display flex
      justify-content space-around
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
  .pagintion
    width $width
    margin auto
    padding-bottom 60px
  .dialog
    >>>.el-dialog__header
      background-color #fafbfc
      padding 20px 20px
    >>>.el-dialog__title
      font-size 16px
      color #7a7a7a
      font-weight bold
    >>>.el-dialog__headerbtn
      top 10px
      right 10px
      font-size 35px
    >>>.el-dialog
      width 400px
    >>>.el-dialog__body
      text-align center
    .login-form
      width 300px
      margin auto
      button
        width 160px
        margin-top 10px
        margin-left -20px
  // .login-dialog
  // >>>.el-dialog
  // width 400px
  .dialog-content
    display flex
    justify-content center
    padding-bottom 40px
    h1
      color #1c1d1f
      font-size 16px
      font-weight bold
      padding 10px 0
    button
      width 130px
      height 40px
      margin 20px 0 0
      color white
      background-color #1c1d1f
      border-color #1c1d1f
      // box-shadow 0 0 1px 1px #1c1d1f
      &:disabled
        content ''
        background-color #a8a8a8 !important
        border-color #a8a8a8
      &:hover
        background-color rgba(#1c1d1f, 0.8)
    .border-btn
      background-color white
      color #1c1d1f
      &:hover
        background-color white
        color rgba(#1c1d1f, 0.8)
    .online-btn
      width 130px
    .left
      position relative
      display flex
      flex-direction column
      align-items flex-start
      padding-right 30px
      &:after
        content ''
        position absolute
        height 100px
        width 0
        border-right 1px dashed #a8a8a8
        right 0
        bottom 0
    .right
      display flex
      flex-direction column
      align-items flex-start
      padding-left 30px
</style>
