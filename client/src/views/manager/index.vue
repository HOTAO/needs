<template>
  <div id="manager">
    <div class="header">
      <div class="logo">极豆科技
        <router-link :to="{name: 'home'}">前端展示页面</router-link>
      </div>
      <!-- <table>
        <thead>
          <tr>
            <td>id</td>
            <td>名称</td>
            <td>path</td>
            <td>排期</td>
            <td>分类</td>
            <td>上传时间</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="need in needs" :key="need.id">
            <td>{{need.id}}</td>
            <td>{{need.name}}</td>
            <td>{{need.path}}</td>
            <td>{{need.status}}</td>
            <td>{{need.type}}</td>
            <td>{{need.create_time}}</td>
            <td>
              <el-button type="primary">修改</el-button>
              <el-button type="danger">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <div class="title">后台——需求管理列表</div>
    <div class="action">
      <el-button type="primary" @click="$router.push({name:'create'})">添加新需求</el-button>
      <div>
        <el-input v-model="search" placeholder=""></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <el-table class="table" :data="needs" style="width: 100%">
      <el-table-column label="需求 Id" width="80">
        <template slot-scope="scope">
          <span v-if="editNeedIndex !== scope.$index" style="margin-left: 10px">{{ scope.row.id }}</span>
          <el-input v-else v-model="need.id" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column label="需求名字" width="180">
        <template slot-scope="scope">
          <span v-if="editNeedIndex !== scope.$index" style="margin-left: 10px">{{ scope.row.name }}</span>
          <el-input v-else v-model="need.name" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column label="需求状态" width="120">
        <template slot-scope="scope">
          <span v-if="editNeedIndex !== scope.$index" style="margin-left: 10px">{{ scope.row.status }}</span>
          <!-- <el-input v-else v-model="need.status" placeholder=""></el-input> -->
          <el-select v-else v-model="need.status" placeholder="">
            <el-option label="进行" :value="1"></el-option>
            <el-option label="等待" :value="2"></el-option>
            <el-option label="暂缓" :value="3"></el-option>
            <el-option label="全部" :value="4"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" width="120">
        <template slot-scope="scope">
          <span v-if="editNeedIndex !== scope.$index" style="margin-left: 10px">{{ scope.row.type }}</span>
          <!-- <el-input v-else v-model="need.type" placeholder=""></el-input> -->
          <el-select v-else v-model="need.type" placeholder="">
            <el-option label="商务支撑" :value="1"></el-option>
            <el-option label="线上活动" :value="2"></el-option>
            <el-option label="前端" :value="3"></el-option>
            <el-option label="后端" :value="4"></el-option>
            <el-option label="Android" :value="5"></el-option>
            <el-option label="iOS" :value="6"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="需求地址" width="180">
        <template slot-scope="scope">
          <span v-if="editNeedIndex !== scope.$index" style="margin-left: 10px">{{ scope.row.path }}</span>
          <el-input v-else v-model="need.path" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column label="需求上传时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <template v-if="editNeedIndex !== scope.$index">
            <el-button @click="_handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-popover placement="top" width="160" :value="deleteIndex === scope.$index">
              <p>确定要删除这条需求么？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="deleteIndex = -1">取消</el-button>
                <el-button type="primary" size="mini" @click="_handleDelete(scope.$index, scope.row)">确定</el-button>
              </div>
              <el-button type="danger" slot="reference" @click="deleteIndex = scope.$index">删除</el-button>
            </el-popover>
            <!-- <el-button type="danger" @click="_handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
          <template v-else>
            <el-button type="parmary" @click="_updateNeed">保存</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<style lang="stylus" scoped>
#manager
  width 1040px
  margin 0 auto
  text-align left
  .header
    display flex
    justify-content space-between
    align-items center
    height 60px
    width 1040px
    margin 0 auto
  .title
    font-size 30px
  .action
    display flex
    justify-content space-between
    align-items center
    margin 20px 0 40px
    >div
      display flex
      align-items center
  .table
    >>>.cell
      text-align center
</style>
<script>
import api from '../../api/index.js'
export default {
  name: 'manager',
  data() {
    return {
      visible2: false,
      isDetele: false,
      editNeedIndex: -1,
      deleteIndex: -1,
      need: {},
      search: '',
      needs: []
    }
  },
  created() {
    this._getNeeds()
  },
  methods: {
    _updateNeed() {
      const params = Object.assign({}, this.need)
      const needId = params.id
      delete params.id
      api
        .updateNeeds(needId, params)
        .then(res => {
          this.editNeedIndex = -1
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    _handleEdit(index, row) {
      this.editNeedIndex = index
      this.need = row
    },
    _handleDelete(index, row) {
      this.deleteIndex = -1
      // this.isDetele = false
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
      // this.
      const params = {
        status: 1
      }
      api
        .getNeeds(params)
        .then(res => {
          this.needs = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
