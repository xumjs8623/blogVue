<template>
  <el-row>
    <el-col :span="24">
      <bread-crumb></bread-crumb>
    </el-col>
    <el-col :span="24">
      <el-row class="nav-search">
        <el-col :span="24">
          <div class="user-input">
            <el-input v-model="keyword" placeholder="输入手机号、姓名、用户名进行搜索" class="keyword-input" @keyup.enter.native="getTable(1,keyword)"></el-input>
          </div>
          <el-button type="primary" @click="getTable(1,keyword)"><i class="iconfont iconfont-handle icon-sousuo_sousuo"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="nav-handle">
      <el-button type="danger" @click="allDelete"><i class="iconfont iconfont-handle icon-shanchu"></i>批量删除</el-button>
      <el-button type="success" @click="dialogTag = true"><i class="iconfont iconfont-handle icon-xinzeng1"></i>新增</el-button>
    </el-col>
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="所属角色"
          width="120"
          :formatter="roleTable">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120"
          :formatter="sexTable">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="lastLogin"
          label="登录时间"
          min-width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="userPwdReset(scope)">重置密码</el-button>
            <el-button type="text" size="small" @click="userEdit(scope)">编辑</el-button>
            <el-button type="text" size="small" @click="userDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <pagination :total="total" :currentPage="1" :currentChange="getTable" :setIndex="setIndex"></pagination>
    </el-col>
    <el-col :span="24">
      <el-dialog
      title="用户信息"
      :visible.sync="dialogTag"
      :before-close="dialogClose"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
         <el-input type="hidden" v-model="ruleForm.id"></el-input>
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名(登录)" prop="userName">
            <el-input type="text" v-model="ruleForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="1" value="1">男</el-radio>
              <el-radio label="0" value="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input type="text" v-model="ruleForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属角色" prop="roleId">
            <el-select v-model="ruleForm.roleId" placeholder="请选择">
              <el-option label="会员" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="dialogTag = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import breadCrumb from './BreadCrumb'
import pagination from '../common/Pagination'
import * as api from '../../api'
import * as handle from '../common/handle'
export default {
  components: {
    breadCrumb,
    pagination
  },
  data () {
    return {
      tableData: [],
      total: 0,
      keyword: '',
      multipleSelection: [],
      dialogTag: false, // 新增修改用户弹窗
      setIndex: new Date(), // 设置首页标签
      ruleForm: {
        id: '',
        name: '',
        userName: '',
        password: '',
        mobile: '',
        sex: '',
        roleId: ''
      },
      rules: {
        name: [{
          required: true, message: '请输入姓名', trigger: 'blur'
        }],
        userName: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        password: [{
          required: true, message: '请输入用户名', trigger: 'blur'
        }],
        sex: [{
          required: true, message: '请选择性别', trigger: 'blur'
        }],
        mobile: [{
          required: true, message: '请输入手机号', trigger: 'blur'
        }],
        roleId: [{
          required: true, message: '请选择所属角色', trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getTable()
  },
  methods: {
    // 获取table数据
    getTable (page, keyword) {
      page = page || 1
      keyword = keyword || ''
      api.userList({
        page: page,
        limit: 10,
        keyword: keyword
      })
        .then(data => {
          if (data.code === 1) {
            this.tableData = data.data
            this.total = data.total
          }
        })
    },
    // 全选标签
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 关闭弹窗
    dialogClose (done) {
      this.ruleForm = handle.formClean(this.ruleForm)
      done()
    },
    // 删除用户
    userDelete (obj) {
      this.$confirm('确定删除用户：' + obj.row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userDeleteCom(obj.row.id, obj)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 全部删除
    allDelete () {
      // id集合
      var ids = []
      // 名字集合
      var names = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        // 循环全选数组内，将id和名称提取出来
        ids.push(this.multipleSelection[i].id)
        names.push(this.multipleSelection[i].name)
      }
      this.$confirm('确定删除用户：' + names.join(), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认后调用全部删除
        this.userDeleteCom(ids.join())
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除公共函数
    userDeleteCom (ids, obj) {
      var _this = this
      api.userDelt({id: ids})
        .then(data => {
          if (data.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000,
              onClose: function () {
                // 如果有obj传入，那么就是删除按钮的操作
                if (obj) {
                  // 删除当前数据，并将总数减一
                  _this.tableData.splice(obj.$index, 1)
                  _this.total--
                } else {
                  // 反之，则为全部删除按钮
                  _this.getTable()
                  _this.setIndex = new Date() // 设置分页首页
                }
              }
            })
          } else if (data.code === 0) {
            this.$message({
              message: data.msg,
              type: 'error'
            })
          }
        })
    },
    // 用户编辑界面
    userEdit (obj) {
      var _this = this
      api.userShow({id: obj.row.id})
        .then(data => {
          if (data.code === 1) {
            // 循环表单对象
            for (let x in _this.ruleForm) {
              if (x === 'roleId') {
                // 如果等于roleId,那么设置roleId为字符串类型
                _this.ruleForm[x] = String(data.data[x])
              } else {
                _this.ruleForm[x] = data.data[x]
              }
            }
            _this.dialogTag = true
          } else {
            this.$message('网络繁忙')
          }
        })
    },
    // 用户新增修改
    submitForm (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid && this.ruleForm === '') {
          api.userInsert(this.ruleForm)
            .then(data => {
              if (data.code === 1) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    // 关闭弹窗
                    _this.dialogTag = false
                    // 清空数据
                    _this.ruleForm = handle.formClean(_this.ruleForm)
                    // 重新获取数据
                    _this.getTable()
                    _this.setIndex = new Date() // 设置分页首页
                  }
                })
              }
            })
        } else if (valid && this.ruleForm.id !== '') {
          api.userUpdate(this.ruleForm)
            .then(data => {
              if (data.code === 1) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    // 关闭弹窗
                    _this.dialogTag = false
                    // 清空数据
                    _this.ruleForm = handle.formClean(_this.ruleForm)
                    // 重新获取数据
                    _this.getTable()
                    _this.setIndex = new Date() // 设置分页首页
                  }
                })
              }
            })
        } else {
          console.log('验证失败')
        }
      })
    },
    roleTable (row) {
      if (row.roleId === 3) {
        return '会员'
      } else {
        return '管理员'
      }
    },
    sexTable (row) {
      let sexName = ''
      switch (row.sex) {
        case 1:
          sexName = '男'
          break
        case 0:
          sexName = '女'
          break
        default:
          sexName = '未知'
          break
      }
      return sexName
    }
  }
}
</script>
<style>
.nav-search{
  margin-top:20px;
  margin-bottom:20px;
  text-align:center;
}
.user-input {
  display: inline-block;
  width: 300px;
}
.nav-handle{
  margin-bottom:20px;
  background:#eef1f6;
  padding:10px;
  border-radius:5px;
}
table .cell,table td{
  text-align: center;
}
</style>
