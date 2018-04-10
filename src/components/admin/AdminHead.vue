<template>
  <el-row class="menus-head">
    <el-col :span="12">
      <span class="menus-logo">运发购物商城后台管理</span>
    </el-col>
    <el-col :span="12">
      <div class="menus-user" @mouseenter="show = true" @mouseleave="show = false">
        <span class="menus-user-name">{{userName}} <i class="iconfont icon-jiantou-copy"></i></span>
        <transition name="fade">
          <div class="menus-user-handle" v-show="show">
            <span>个人信息</span>
            <span @click="pwdChangeTag = true">修改密码</span>
            <span @click="logoutFun()">退出登录</span>
          </div>
        </transition>
      </div>
    </el-col>
    <el-col :span="24">
      <el-dialog
      title="修改密码"
      :visible.sync="pwdChangeTag"
      size="small">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="ruleForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="pwdChangeTag = false">取消</el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import * as api from '../../api'
import { mapActions } from 'vuex'
export default {
  data () {
    var checkOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      show: false, // 用户名下拉标签
      pwdChangeTag: false, // 密码修改标签
      userName: '',
      // 密码修改表单字段
      ruleForm: {
        newPassword: '',
        checkPass: '',
        oldPassword: ''
      },
      rules: {
        oldPassword: [
          { validator: checkOldPass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    console.log('头部加载')
    var _this = this
    api.userList()
      .then(data => {
        console.log(data)
        if (data.code) {
          _this.userName = data.data.name
        } else {
          this.$message.error(data.msg)
        }
      })
  },
  methods: {
    // 登出
    logoutFun () {
      api.logout()
      this.logout()
      this.$router.push('/admin/login')
    },
    // 密码修改
    submitForm (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.userUpdate(this.ruleForm)
            .then(data => {
              if (data.code === 1) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    // 关闭弹窗
                    _this.pwdChangeTag = false
                    // 清空数据
                    _this.cleanPassword()
                  }
                })
              } else if (data.code === 0) {
                this.$message({
                  message: data.msg,
                  duration: 1000,
                  type: 'error'
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 密码修改界面值清空处理
    cleanPassword: function () {
      for (let x in this.ruleForm) {
        console.log(this.ruleForm[x])
        this.ruleForm[x] = ''
      }
    },
    // vuex操作函数
    ...mapActions([
      'logout'
    ])
  }
}
</script>
<style>
  .menus-head{
    background-color: #19a97b;
    height: 50px;
  }
  .menus-logo{
    line-height:50px;
    color:#fff;
    margin-left:20px;
    font-size:16px;
  }
  .menus-user{
    float:right;
    width:100px;
    margin-right:50px;
    text-align:center
  }
  .menus-user:hover{
    background:#4dd6aa;
  }
  .menus-user-name{
    line-height:50px;
    color:#fff;
    cursor:pointer
  }
  .menus-user-handle{
    position:absolute;
    color:#000;
    width:100px;
    text-align:center;
    z-index:1;
    right:50px;
    height:93px;
    overflow:hidden;
    background:#fff;
  }
  .menus-user-handle span{
    cursor:pointer;
    display:block;
    line-height:30px;
    border-bottom:solid 1px #eee;
    border-left:solid 1px #eee;
    border-right:solid 1px #eee;
  }
  .menus-user-handle span:hover{
    background:#eee;
  }
  .fade-enter-active, .fade-leave-active {
  transition: height .2s
  }
  .fade-enter, .fade-leave-active {
    height: 0px;
  }
</style>
