<template>
  <div class="asider">
    <div class="boxs">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" router>
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu index="content">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/index/publish">发表文章</el-menu-item>
        <el-menu-item index="/index/articles">内容列表</el-menu-item>
        <el-menu-item index="/index/material">素材管理</el-menu-item>
        <el-menu-item index="/index/comment">评论列表</el-menu-item>
      </el-submenu>
      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/index/fansData">图文数据</el-menu-item>
        <el-menu-item index="/index/fansThing">粉丝概况</el-menu-item>
        <el-menu-item index="/index/fansPhoto">粉丝画像</el-menu-item>
        <el-menu-item index="/index/fansList">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/index/account">
        <i class="el-icon-circle-plus"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
  .asider{
    // width: 200px;
    // min-height: 100vh;
    // background-color:#323745;
    .boxs{
      padding: 15px 0;
      text-align: center;
      background-color: #2e2f32;
      img {
        width: 120px;
        height: 30px;
      }
    }
  }
</style>
