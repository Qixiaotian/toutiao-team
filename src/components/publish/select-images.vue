<template>
  <!-- 接下来实现弹层的结构 -->
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
        <div class="material-list">
          <el-card class="material-item" v-for="(item,index) in imgList" :key="index">
            <img :src="item.url" @click="selectImg(item)" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            :total="page.total"
            @current-change="changePage"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">
        <el-upload action :show-file-list="false" :http-request="uploadImg">
          <i
            class="el-icon-plus avatar-uploader-icon"
            style="border: 1px dashed #d9d9d9;
    border-radius: 6px;"
          ></i>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      imgList: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectImg', result.data.url)
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMateril()
    },
    selectImg (item) {
      this.$emit('selectImg', item.url)
    },
    getMateril () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: false, ...pageParams }
      }).then(result => {
        this.imgList = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMateril()
  }
}
</script>

<style lang="less" scoped>
  .material-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .material-item {
      margin: 5px 0;
      width: 150px;
      height: 150px;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
</style>
