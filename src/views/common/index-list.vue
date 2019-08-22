<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
      <el-table :data="list" stripe>
        <el-table-column prop="title" label="标题" width="600"></el-table-column>
        <el-table-column prop="comment_status" :formatter="formatter" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="评论总数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论总数"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text">修改</el-button>
            <el-button
              @click="closeOrOpen(row)"
              type="text"
              :style="{color:row.comment_status?'#E6A23C':'#409EFF'}">
              {{row.comment_status ? '关闭评论':'打开评论'}}
              </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      console.log(mess)
      this.$confirm('您确定要' + mess + '评论吗', '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(({ data }) => {
          row.comment_status = data.allow_comment
          // this.getComment()
        })
      })
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
