<template>
  <div class="cover-image">
    <!-- 对在父组件传过来的值中进行循环将封页展示出来   -->
    <!-- 通过点击事件弹出弹层 -->
    <div class="cover-item" @click="clickImg(index)" v-for="(item,index) in images" :key="index">
      <img :src="item?item:defaultImg" alt />
    </div>
    <!--  在点击图片进行一个弹层提示 -->
    <el-dialog :visible="showDialog" @close="showDialog=false" >
      <!-- 弹层里面的功能十分复杂所以放在一个新的组件当中 -->
      <select-images @selectImg="selectedImg"></select-images>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      selectIndex: -1,
      showDialog: false,
      defaultImg: require('../../styles/imgs/pic_bg.png')
    }
  },
  methods: {
    clickImg (index) {
      this.showDialog = true
      this.selectIndex = index
    },
    selectedImg (url) {
      this.showDialog = false
      this.$emit('updateImages', url, this.selectIndex)
    }
  }
}
</script>

<style lang="less" scoped>
  .cover-image {
    display: flex;
    margin-left: 50px;
    .cover-item {
      width: 200px;
      height: 200px;
      border: 1px solid #ccc;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
