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

    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <img src alt />
        <el-col>
          <span>你说</span>
          <el-tag>已发表</el-tag>
          <span>2019-1-23</span>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-button>编辑</el-button>
        <el-button>删除</el-button>
      </el-col>
    </el-row>
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
      ]
    }
  }
}
</script>

<style>
  .formDate {
    margin-left: 40px;
    margin-top: 40px;
  }
</style>
