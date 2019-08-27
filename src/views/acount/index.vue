<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form
      class="formdata"
      style="padding:40px;margin-bottom:20px"
      :model="formData"
      :rules="rules"
      ref="myform"
    >
      <div style="position: relative;">
        <el-form-item label="用户名" label-width="200px" prop="name">
          <el-input style="width:300px" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" label-width="200px" prop="text">
          <el-input style="width:300px" v-model="formData.intro"></el-input>
        </el-form-item>
        <el-upload class="stimg" show-file-list="false" action :http-request="uploadImg">
          <img :src="formData.photo?formData.photo:defaultImg" alt />
          <a href="javascript:" class="edit">修改图片</a>
        </el-upload>
      </div>
      <el-form-item
        label="账户信息"
        label-width="80px"
        style="border-bottom:1px solid #ccc;border-top:1px solid #ccc"
      >
        <div class="heade" style="padding:10px;border-bottom:1px #ccc solid;height:60px">
          <span>头条号类型</span>
          <span style="margin:20px;">个人</span>
        </div>
        <div class="heade" style="padding:10px;height:60px">
          <span>头条号id</span>
          <span style="margin-left:30px">1</span>
        </div>
      </el-form-item>
      <el-form-item label="登陆方式" style="border-bottom:1px solid #ccc;padding-bottom:20px">
        <span style="margin-left:30px;">绑定手机</span>
        <el-input
          style="width:300px;margin-left:30px"
          placeholder="电话号码"
          disabled
          v-model="formData.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        style="border-bottom:1px solid #ccc;padding-bottom:20px"
        prop="emali"
      >
        <el-input style="margin-left:145px;width:300px" v-model="formData.email">{{formData.emali}}</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userInfo">提交保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '',
        intro: '',
        photo: null,
        email: '',
        mobile: null
      },
      defaultImg: require('../../assets/img/avatar.jpg'),
      rules: {
        name: [
          {
            required: true,
            message: '内容不能输入为空哦'
          },
          { min: 3, max: 6, message: '输入的字符必须是在3到6个字符之间' }
        ],
        intro: [
          { required: true, message: '内容不能输入为空哦' },
          { min: 4, max: 12, message: '输入的字符必须是在4到12个字符之间' }
        ],
        email: [
          {
            required: true,
            message: '内容不能输入为空哦'
          },
          {
            patter: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '您输入的格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    // 图片上传的信息
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        this.formData.photo = res.data.photo
        eventBus.$emit('uploadEvent')
      })
    },
    // 编辑信息保存上传
    userInfo () {
      this.$confirm('确认保存', '提示').then(() => {
        this.$refs.myform.validate(isOk => {
          isOk &&
            this.$axios({
              method: 'patch',
              url: '/user/profile',
              data: this.formData
            }).then(() => {
              this.$message({ message: '信息保存成功', type: 'success' })
            })
          eventBus.$emit('uploadEvent')
        })
      })
    },
    // 发送请求渲染页面
    getData () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  .stimg {
    position: absolute;
    top: 0;
    left: 10px; //    display:flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .edit {
      display: block;
      margin-left: 10px;
    }
  }
</style>
