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
        <quill-editor
          v-model="formData.content"
          style="width:800px;height:200px;margin-bottom:80px;margin-left:50px"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
        ></quill-editor>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 使用之前的封面组件 对imags的参数传入子组件中使用其参数 -->
        <cover-image
          :images="formData.cover.images"
          :type="formData.cover.type"
          @updateImages="getData"
        ></cover-image>
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
        <el-button @click="checkData(!draft)">存入草稿</el-button>
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
        content: [{ required: true, message: '内容不能为空' }]
      }
    }
  },
  methods: {
    // 通过 子组件封面传过来的值 在本组件接受一下
    getData (url, index) {
      console.log(url, index)
      this.formData.cover.images = this.formData.cover.images.map((item, i) => {
        return i === index ? url : item
      })
    },
    // 获取最新的封面类型
    // 去改变当前的images类型
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 获取当前频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.list = result.data.channels
      })
    },
    // 根据当前接口一口四用
    checkData (draft) {
      this.$refs.formdate.validate(isok => {
        if (isok) {
          let { articleId } = this.$route.params
          let method = articleId ? 'put' : 'post'
          let url = articleId ? `/articles/${articleId}` : '/articles'
          this.$axios({
            method,
            url,
            params: { draft },
            data: this.formData
          }).then(result => {
            this.$router.push('/index/articles')
          })
        }
      })
    },
    // 接收上面组件传递的参数
    getArticleById () {
      let { articleId } = this.$route.params
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 绑定数据
      })
    }
  },
  created () {
    let { articleId } = this.$route.params
    articleId && this.getArticleById()
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

  }
</style>
