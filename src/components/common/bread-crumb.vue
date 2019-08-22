<template>
<div>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to='{path:"/"}'>首页</el-breadcrumb-item>
  </el-breadcrumb>
  <el-breadcrumb>
  <el-breadcrumb-item>
        <slot name='title'></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>

</div>
</template>

<script>
export default {}
</script>

<style>
</style>
