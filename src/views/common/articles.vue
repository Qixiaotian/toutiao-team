<template>
  <el-card slot="header">
    <bread-crumb>
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="formDate">
      <el-form-item label="文章状态">
        <el-radio-group v-model="formData" @change="reset">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-select v-model="formData" placeholder="请选择">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="value1"
          type="daterange"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total_title">共找到56789条符合条件的内容</div>
    <div class="content-list">
      <div class="content-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img src="../../assets/img/404.png" alt />
          <div class="info">
            <span>我是内容标题</span>
            <el-tag type="width:60px">标签一</el-tag>
            <span class="data">2019-08-22 17:21:31</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 1,
      value: '',
      value1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      list: [1, 2, 3]
    }
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
          .data{
              color:#999;
              font-size: 12px;
          }
        }
      }
      .right {
          span,span i {
              font-size: 12px;
              color: #333;
          }
          span{
              margin-right: 5px
          }
      }
    }
  }
</style>
