<template>
<div>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to='{path:"/index"}'>首页</el-breadcrumb-item>
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
