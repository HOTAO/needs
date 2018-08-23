<template>
  <div id="manager">
    <div class="header">
      <div>
        <div class="logo">
          <img src="~@/assets/logo.png" alt="">
          <a>后台 - 需求管理列表</a>
        </div>
        <div class="client">
          <img src="~@/assets/img.png" alt="">
          <router-link :to="{name: 'home'}">跳转前端展示页面</router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="action">
        <el-button type="primary" @click="$router.push({name:'create'})">添加新需求</el-button>
        <div class="search">
          <el-input ref="search" @keyup.enter.native="_search" @blur="search.long = false" :class="{force: search.long}" @focus="search.long = true" suffix-icon="el-icon-search" placeholder="请输入内容" v-model="search.value">
          </el-input>
        </div>
      </div>
      <el-table class="table" ref="expandForm" @expand-change="_expandChange" :data="needsInfo.list" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <!-- <el-form-item label="Id：">
              <el-input v-model="row.id" placeholder=""></el-input>
            </el-form-item> -->
              <el-form-item label="名字：">
                <el-input v-model="row.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="原型地址：">
                <el-input v-model="row.path" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="状态：">
                <el-select v-model="row.status" placeholder="">
                  <el-option v-for="option in status" :key="option.value" :label="option.label" :value="option.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文档地址：">
                <el-input v-model="row.wordPath" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="类型：">
                <el-select v-model="row.type" placeholder="">
                  <el-option v-for="type in types" :key="type.value" :label="type.label" :value="type.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="下载地址：">
                <el-input v-model="row.downloadPath" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="端类型：">
                <el-checkbox-group v-model="row.classifys">
                  <el-checkbox v-for="classify in classifys" :key="classify.value" :label="classify.value">{{classify.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <el-button style="float: right;margin-left: 20px" @click="_handleEdit(props.row, false)">取消</el-button>
            <el-button style="float: right" type="primary" @click="_updateNeed">保存</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Id" prop="id" width="60px">
        </el-table-column>
        <el-table-column label="名字" prop="name">
        </el-table-column>
        <el-table-column :label="statusLabel" prop="status" :filters="[{text:'进行',value:1},{text:'等待',value:2},{text:'暂缓',value:3}]" :filter-multiple="false" :filtered-value="filterStatus">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ _status(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ _types(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" prop="create_time" width="180">
        </el-table-column>
        <el-table-column label="最近修改时间" prop="update_time" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button style="color: #2A6FFE" @click="_handleEdit(scope.row, true)">编辑</el-button>
            <el-popover placement="top" width="160" :value="deleteIndex === scope.$index">
              <p>确定要删除这条需求么？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="deleteIndex = -1">取消</el-button>
                <el-button type="primary" size="mini" @click="_handleDelete(scope.$index, scope.row)">确定</el-button>
              </div>
              <el-button class="delete-btn" style="color: #F56B6B" slot="reference" @click="deleteIndex = scope.$index">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagintion" background layout="prev, pager, next" @current-change="_handleCurrentChange" :current-page="params.page" :page-size="params.pageSize" :total="needsInfo.count">
      </el-pagination>

    </div>
  </div>
</template>
<style lang="stylus" scoped>
#manager
  text-align left
  padding-bottom 60px
  .header
    background-color white
    >div
      width 1040px
      margin 0 auto
      display flex
      justify-content space-between
      align-items center
      height 60px
    .client
      img
        vertical-align unset
        width 14px
        height @width
      a
        color #2A6FFE
        font-weight bold
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
  .title
    font-size 30px
  .action
    display flex
    justify-content space-between
    align-items center
    margin 50px 0 40px
    >div
      display flex
      align-items center
    .search
      .force
        >>>.el-input__inner
          width 277px
      >>>.el-input__inner
        border 0
        transition all 1s
        width 177px
        font-size 14px
        color #a8a8a8
  .table
    margin-bottom 40px
    .delete-btn
      &:hover
        background-color rgba(#FF0000, 0.08)
        border-color rgba(#FF0000, 0.08)
    >>>.el-table__expanded-cell
      padding 20px 100px
      background #fafbfc !important
    .table-expand
      display flex
      justify-content space-between
      align-items center
      flex-wrap wrap
      >>>.el-form-item__label
        width 90px
        text-align right
      >>>.el-input__inner
        padding-right 35px
        width 280px
    >>>.cell
      text-align center
      >>>.el-table__expand-icon
        pointer-events none
</style>
<script>
import api from '../../api/index.js'
export default {
  name: 'manager',
  data() {
    return {
      isEdit: false,
      filterStatus: [],
      statusLabel: '全部',
      page: 1,
      pageSize: 10,
      deleteIndex: -1,
      row: {},
      expandedRows: {},
      search: {
        value: '',
        long: false
      },
      needsInfo: {},
      status: [
        {
          value: 1,
          label: '进行'
        },
        {
          value: 2,
          label: '等待'
        },
        {
          value: 3,
          label: '暂缓'
        },
        {
          value: 4,
          label: '全部'
        }
      ],
      types: [
        {
          value: 1,
          label: '商务'
        },
        {
          value: 2,
          label: '活动'
        },
        {
          value: 3,
          label: '产品'
        },
        {
          value: 4,
          label: '综合'
        }
      ],
      classifys: [
        {
          value: 1,
          label: '后端'
        },
        {
          value: 2,
          label: '小程序'
        },
        {
          value: 3,
          label: 'WAP'
        },
        {
          value: 4,
          label: 'Android'
        },
        {
          value: 5,
          label: 'iOS'
        },
        {
          value: 6,
          label: 'web'
        }
      ]
    }
  },
  watch: {
    filterStatus: {
      handler: function(val, oldVal) {
        this.statusLabel = val.length > 0 ? this.status[val - 1].label : '全部'
        this._getNeeds()
      },
      deep: true
    }
  },
  computed: {
    params() {
      return {
        page: Number(this.$route.query.page) || 1,
        pageSize: 10,
        status: this.filterStatus[0] || ''
      }
    }
  },
  created() {
    this._getNeeds()
  },
  methods: {
    // _handleFilter(value, row, col) {
    //   return true
    // },
    // _render() {},
    _search() {
      // this.search.long = false
      this._getNeeds()
    },
    _handleCurrentChange(page) {
      this.$router.push({ query: { page } })
      this._getNeeds()
    },
    _expandChange(row, expandedRows) {
      this.row = row
      this.row.classifys =
        typeof row.classifys === 'string'
          ? JSON.parse(row.classifys)
          : row.classifys
      this.expandedRows = expandedRows
    },
    _status(index) {
      return this.status[index - 1].label
    },
    _types(index) {
      return this.types[index - 1].label
    },
    _updateNeed() {
      const params = Object.assign({}, this.row)
      const needId = params.id
      params.classifys = JSON.stringify(params.classifys)
      delete params.id
      params.path = /http:\/\//.test(params.path)
        ? params.path
        : `http://${location.hostname}:8003/${params.path}`
      params.wordPath = /http:\/\//.test(params.wordPath)
        ? params.wordPath
        : `http://${location.hostname}:8003/${params.wordPath}`
      params.downloadPath = /http:\/\//.test(params.downloadPath)
        ? params.downloadPath
        : `http://${location.hostname}:8003/${params.downloadPath}`
      params.create_time = parseInt(+new Date(params.create_time) / 1000)
      api
        .updateNeeds(needId, params)
        .then(res => {
          this._getNeeds()
          this.isEdit = false
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
        })
        .catch(err => {
          this.isEdit = false
          this.$notify({
            title: '错误',
            message: err,
            type: 'success'
          })
        })
    },
    _handleEdit(row, boolean) {
      if (!this.isEdit) {
        this.isEdit = boolean
        // toggleRowExpansion 用于可展开表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
        this.$refs.expandForm.toggleRowExpansion(row, boolean)
      } else if (!boolean) {
        this.isEdit = boolean
        this.$refs.expandForm.toggleRowExpansion(row, boolean)
      }
    },
    _handleDelete(index, row) {
      this.deleteIndex = -1
      api
        .deleteNeeds({ id: row.id })
        .then(res => {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this._getNeeds()
        })
        .catch(err => {
          console.log(err)
        })
    },
    _getNeeds() {
      const params = {
        keyword: this.search.value,
        page: this.params.page,
        pageSize: this.params.pageSize,
        status: this.params.status
      }
      api
        .getNeeds(params)
        .then(res => {
          this.needsInfo = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
