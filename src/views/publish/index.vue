<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form class="formstyle" :rules="rules" ref="formdate" :model="formData">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入内容" class="title" v-model="formData.title">请输入内容</el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          class="input-area"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="formData.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="2">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </el-form-item>
      <el-form-item label="频道">
        <template>
          <el-select placeholder="请选择" v-model="formData.channel_id">
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkData(false)">发表</el-button>
        <el-button @click="checkData(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 1,
      list: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      draft: false,
      rules: {
        title: [
          { required: true, message: '内容不能为空' },
          { min: 5, max: 30, message: '输入放入字符在5到30之间' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        cover: [{ required: true, message: '内容不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.list = result.data.channels
      })
    },
    checkData (s = false) {
      this.$refs.formdate.validate(isok => {
        if (isok) {
          this.$axios({
            method: 'post',
            url: '/articles',
            params: { draft: s },
            data: this.formData
          }).then(result => {
            this.$router.push('/index/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
  .formstyle {
    margin-left: 50px;
    margin-top: 20px;
    .title {
      width: 400px;
    }
    .input-area {
      width: 1000px;
    }
.avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  }
</style>
