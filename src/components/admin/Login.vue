<template>
  <div class="login-wrap">
    <div class="ms-title">测试后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '../../api'
import { Loading } from 'element-ui'
import { mapActions } from 'vuex'
export default {
  data: function () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      let loadingInstance = Loading.service({ fullscreen: true })
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
            .then((data) => {
              loadingInstance.close()
              if (data.code === 1) {
                sessionStorage.setItem('userInfo', data.data)
                _this.setLogin({roleId: data.data.roleId, name: data.data.name})
                _this.$router.push('/admin/user')
              } else {
                _this.$message.error(data.msg)
              }
            })
        } else {
          return false
        }
      })
    },
    ...mapActions([
      'setLogin'
    ])
  }
}
</script>

<style>
  .login-wrap{
      position: absolute;
      width:100%;
      height:100%;
      background:#1F2D3D;
  }
  .ms-title{
      position: absolute;
      top:50%;
      width:100%;
      margin-top: -230px;
      text-align: center;
      font-size:30px;
      color: #fff;

  }
  .ms-login{
      position: relative;
      width: 300px;
      height: 160px;
      padding: 40px;
      border-radius: 5px;
      margin: 0 auto;
      background: #fff;
      margin-top: 20%;
  }
  .login-btn{
      text-align: center;
  }
  .login-btn button{
      width:100%;
      height:36px;
  }
  .login-wrap .el-input{
      width: 100%;
  }
</style>
