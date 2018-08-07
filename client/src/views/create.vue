<template>
  <div id="upload">
    <div class="title">添加需求</div>
    <el-form class="form" ref="form" :model="form" label-width="80px">
      <el-form-item :rules="[{required: true, message: '请输入需求名称', trigger: 'blur'}]" label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="path" label="原型路径">
        <el-input v-model="form.path" placeholder="(例如：/maya_adminsystem_1.2.4_agent2)"></el-input>
      </el-form-item>
      <el-form-item prop="wordPath" label="文档路径">
        <el-input v-model="form.wordPath" placeholder="(例如：/maya_adminsystem_1.2.4_agent2/word)"></el-input>
      </el-form-item>
      <el-form-item prop="downloadPath" label="下载地址">
        <el-input v-model="form.downloadPath" placeholder="(例如：/maya_adminsystem_1.2.4_agent2/download)"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="">
          <el-option v-for="status in statuses" :key="status.value" :label="status.label" :value="status.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="">
          <el-option v-for="type in types" :key="type.value" :label="type.label" :value="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="端分类">
        <el-checkbox-group v-model="form.classifys">
          <el-checkbox v-for="classify in classifys" :key="classify.value" :label="classify.value">{{classify.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="_addNeeds('form')">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
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
  .title
    font-size 24px
    padding-bottom 60px
  .form
    width 540px
    margin 0 auto
    >>>.el-select>.el-input
      width 460px
    >>>.el-checkbox+.el-checkbox
      margin-left 20px
</style>

<script>
import api from '../api/index.js'
export default {
  data() {
    return {
      form: {
        name: '',
        path: '',
        wordPath: '',
        downloadPath: '',
        status: 1,
        type: 1,
        classifys: []
      },
      statuses: [
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
  methods: {
    _addNeeds(formName) {
      const params = Object.assign({}, this.form)

      params.path = params.path ? `http://${location.hostname}:8003/${params.path}` : ''
      params.wordPath = params.wordPath
        ? `http://${location.hostname}:8003/${params.wordPath}`
        : ''
      params.downloadPath = params.downloadPath
        ? `http://${location.hostname}:8003/${params.downloadPath}`
        : ''

      params.classifys = JSON.stringify(params.classifys)
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .addNeeds(params)
            .then(res => {
              this.$notify({
                title: '成功',
                message: res.message,
                type: 'success'
              })
              this.$router.push({ name: 'manager' })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>
