<template>
  <div>
    <el-card >
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
<el-table >
<el-table-column  label="标题" width="600"></el-table-column>
<el-table-column  label="评论状态"></el-table-column>
<el-table-column  label="评论总数"></el-table-column>
<el-table-column  label="粉丝评论总数"></el-table-column>
<el-table-column  label="操作"></el-table-column>
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
  }
}
</script>

<style>
</style>
