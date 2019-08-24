<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <el-form-item label="内容列表">
        <el-radio-group v-model="formData.status" @change="resetPage">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <template>
          <el-select v-model="formData.channel_id" @change="resetPage">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          style="width:400px"
          @change="resetPage"
          value-format="yyyy-MM-dd"
          v-model="formData.dateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total_title">共找到{{page.total}}条符合条件的内容</div>
    <div class="content-list">
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="item.cover.images[0]" alt />
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag style="width:60px">已发表</el-tag>
            <span class="date">2019-08-23 20:47:52</span>
          </div>
        </div>
        <div class="right">
          <span style="cursor:pointer">
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span style="cursor:pointer" @click="delList(item)">
            <i class="el-icon-delete"></i>
            删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="chandPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 默认是全部
        channel_id: null, // 定义频道id 当前选择的频道
        dateRange: null // 时间范围 是个数组
      },
      channels: [], // 频道数据
      list: [], // 内容列表
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    delList (item) {
      this.$confirm('您确定删除此条信息吗?', '提示').then(() => {
        this.$axios({
          url: `articles/${item.id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.getAtricles(this.getConditions())
        })
      })
    },
    getConditions () {
      let { status, channel_id: cid, dateRange } = this.formData
      let params = {
        // key:value(三元表达式)
        status: status === 5 ? null : status, // 由于默认给了5 但是如果是5的话  不能传 所以这里特殊处理一下
        channel_id: cid,
        // (三元表达式)
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null
      }
      params.page = this.page.currentPage
      params.per_page = this.page.pageSize
      return params
    },
    resetPage () {
      this.page.currentPage = 1
      this.getAtricles(this.getConditions())
    },
    chandPage (newPage) {
      this.page.currentPage = newPage
      this.getAtricles(this.getConditions())
    },
    getAtricles (params) {
      this.$axios({
        url: '/articles',
        params: { ...params }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        console.log(this.page.total)
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getAtricles()
    this.getChannels()
  }
}
</script>
<style lang="less" scoped>
  .total_title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .content-list {
    .content-item {
      padding: 10px;
      border-bottom: 1px solid #f2f3f5;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 150px;
          height: 100px;
          border-radius: 4px;
        }
        .info {
          margin-left: 10px;
          display: flex;
          height: 100px;
          padding: 5px 0;
          flex-direction: column;
          justify-content: space-between;
          .date {
            color: #999;
            font-size: 12px;
          }
        }
      }
      .right {
        span,
        span i {
          font-size: 12px;
          color: #333;
        }
        span {
          margin-right: 5px;
        }
      }
    }
  }
</style>
