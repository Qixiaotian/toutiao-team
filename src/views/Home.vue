<template>
<div class="login">
    <el-card class="box-card">
      <img src="../assets/img//logo_index.png" alt="黑马头条" />
      <el-form :model="formData" :rules="rules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile"  placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formData.code"  placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var func = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('需要阅读协议进行勾选'))
      }
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false

      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          // { min: 11, max: 11, message: '天哥友情提示..号码是11位数字哦', trigger: 'blur' }
          // 第二种方法 (正则表达式)
          { pattern: /^1[3456789]\d{9}$/, message: '天哥友情提示..号码格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位数字' }
        ],
        check: [
          { message: '请勾选', validator: func }
        ]
      }
    }
  },
  methods: {
    login () {
      // 手动校验
      // isOk是否通过 result是校验结果 没啥用
      this.$refs.loginForm.validate((isOk, result) => {
        if (isOk) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
            // get 的参数是用params
          }).then(result => {
            console.log(result.data.data)
          })
          console.log('请求通过')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  background-image: url("../assets/img/login_bg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 400px;
    height: 330px;
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
