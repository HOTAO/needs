<template>
  <div id="upload">
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item label="需求名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="需求地址">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="需求状态">
        <el-select v-model="form.status" placeholder="请选择需求状态">
          <el-option label="进行" value="1"></el-option>
          <el-option label="等待" value="2"></el-option>
          <el-option label="暂缓" value="3"></el-option>
          <el-option label="全部" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求类型">
        <el-select v-model="form.type" placeholder="请选择需求类型">
          <el-option label="商务支撑" value="1"></el-option>
          <el-option label="线上活动" value="2"></el-option>
          <el-option label="前端" value="3"></el-option>
          <el-option label="后端" value="4"></el-option>
          <el-option label="Android" value="5"></el-option>
          <el-option label="iOS" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_getNeeds">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="stylus" scoped>
#upload
  width 860px
  margin 60px auto
  padding 60px
  background-color white
  .form
    width 460px
    margin 0 auto
    >>>.el-select>.el-input
      width 380px
</style>

<script>
import api from '../api/index.js'
export default {
  data() {
    return {
      form: {
        name: '',
        path: 'http://localhost:9888/needs/mayaHushManager1.2.3',
        status: '1',
        type: '1'
      }
    }
  },
  methods: {
    _getNeeds() {
      api
        .addNeeds(this.form)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
