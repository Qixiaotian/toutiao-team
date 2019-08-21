<template>
<div class="login" >
   <el-card class="login-card">
   <img src="../styles/imgs/logo_index.png" alt="">
   <el-form :model="formData" :rules="rules" ref="loginData" >
      <el-form-item prop="mobile" >
         <el-input v-model="formData.mobile" placeholder="请输入电话号码" ></el-input>
      </el-form-item>
      <el-form-item prop="code">
         <el-input class="left-input" v-model="formData.code" placeholder="请输入验证码" ></el-input>
         <el-button type="primary" style="float:right">发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="check">
          <el-checkbox  v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
         <el-button type="primary" style="width:100%" @click="login">登录</el-button>
      </el-form-item>

   </el-form>
 </el-card>
</div>

</template>

<script>
// import { truncate } from 'fs'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    var func = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('错误信息'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [ {
          required: true, message: '输入不能为空', trigger: 'blur'
        }, {
          pattern: /^1[3456789]\d{9}$/, message: '号码格式不正确', trigger: 'blur'
        }
        ],
        code: [
          { required: true, message: '输入验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'blur' }
        ],
        check: [
          { message: '请认真阅读之后勾选', validator: func }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginData.validate(isOk => {
        if (isOk) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(result => {
            window.localStorage.setItem('login-info', JSON.stringify(result.data))
            this.$router.push('./index')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login{
  width: 100%;
  height: 100vh;
  background-image:url("../styles/imgs/logo_admin.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
    .left-input{
      width:60% ;

    }
  .login-card{
    width : 400px;
    height : 360px;
  img{
    width: 200px;
    height: 100%;
    display:block;
    margin: 10px auto;
  }
  }
}
</style>
