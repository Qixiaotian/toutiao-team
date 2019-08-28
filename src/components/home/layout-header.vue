<template>
  <div>
    <el-row class="header" type="flex" justify="space-between">
      <el-col :span="12">
        <i class="el-icon-s-unfold" @click="openOrClose"></i>
        <span class="left-header">江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4" class="right">
        <!-- <el-tooltip  placement="bottom">
          <el-input size="small" placeholder="请输入内容" class="right-input">
            <i class="el-icon-search el-input__icon" slot="prefix"></i>
          </el-input>
        </el-tooltip> -->
        <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
          <span>消息</span>
        </el-tooltip>
        <img :src="user.photo?user.photo:defaultImg" alt="" />

        <el-dropdown trigger="click" @command=Msgfun>
          <span class="el-dropdown-link">
            {{user.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item icon="el-icon-plus" command="account">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command="git">Git的地址</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline" command="out">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import eventBus from '../../utils/eventBus'
export default {

  data () {
    return {
      user: {
      },
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    openOrClose () {
      eventBus.$emit('openOrClose') // 触发的事件将联动左侧栏目进行响应的改变
    },
    gitFun () {
      this.$axios({
        url: '/user/profile'

      }).then(res => {
        // console.log(res)
        this.user = res.data
      })
    },
    Msgfun (command) {
      if (command === 'account') {
        this.$axios.push('./index/account')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/Qixiaotian/toutiao-team'
      } else {
        window.localStorage.clear()
        this.$router.push('/')
      }
    }

  },
  created () {
    this.gitFun()
    eventBus.$on('uploadEvent', () => {
      this.gitFun()
    })
  }
}
</script>

<style lang="less" scoped>
  .header {
    margin: 9px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    .right {
      display: flex;
      align-items: center;
      .right-input {
        width: 200px;
        margin-right: 5px;
      }
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 0 10px;
      }
    }
  }
</style>
