<template>
<!-- 最外层容器大 -->
  <el-container>
      <el-aside style="width:200px;" >
          <lay-aside>

          </lay-aside>
      </el-aside>
      <el-container>
          <el-header style="height:55px">
            <lay-header></lay-header>
          </el-header>
          <el-main style="padding:0 0;">
            <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>

export default {
}
</script>

<style>

</style>
