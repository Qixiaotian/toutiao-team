<template>
  <div class="cover-image">
      <div class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../styles/imgs/pic_bg.png')
    }
  }

}
</script>

<style lang="less" scoped>
    .cover-image{
        display: flex;
        margin-left: 50px;
        .cover-item{
          width: 200px;
          height: 200px;
          border:1px solid #ccc;
          padding: 20px;
          display: flex;
          flex-direction: column;
         justify-content: space-between;
         img{
             width: 100%;
             height: 100%;
         }
        }
    }
</style>
