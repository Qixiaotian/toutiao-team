<template>
  <el-card  style="position: relative">
    <bread-crumb slot="header">
      <template slot="tilte">素材管理</template>
    </bread-crumb>
    <el-upload class="upload-img" action="" :http-request="uploadImg" :show-file-list='false'>
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部图片" name="all">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row align="middle" class="operate" type="flex" justify="space-around">
              <i
                class="el-icon-star-off"
                @click="collectFun(item)"
                :style="{color:item.is_collected?'red':''}"></i>

              <i class="el-icon-delete-solid" @click="delMaterial(item)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @current-change="changePage"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>

export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: formData
      }).then(result => {
        this.getMaterial()
      })
    },
    collectFun (item) {
      let mess = item.is_colleted ? '取消收藏' : '收藏'
      this.$confirm('您是否是' + mess + '收藏图片?', '提示').then(() => {
        this.$axios({
          url: `user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_colleted }
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    // 切换页码
    // 删除素材的方法
    delMaterial (item) {
      this.$confirm('您确定删除这个图片吗', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `user/images/${item.id}`
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签
    changeTab () {
      this.page.currentPage = 1 // 因为每次切换标签 都从第一页开始
      this.getMaterial()
    },
    getMaterial () {
      let pageParams = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', ...pageParams }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial() // 第一次进入 activeName === "all"  加载第一页的全部数据
  }
}
</script>

<style lang="less" scoped>

  .img-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .img-card {
      width: 200px;
      height: 200px;
      margin: 10px 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 30px;
        width: 100%;
        background-color: #f4f5f6;
        i {
          font-size: 22px;
        }
      }
    }
  }
.upload-img{
      position: absolute;
      right: 50px;
      top:60px  }
</style>
