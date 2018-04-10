<template>
  <el-row>
    <el-col :span="24">
      <bread-crumb></bread-crumb>
    </el-col>
    <el-col :span="12">
      <el-tree
        :data="tableData"
        :props="defaultProps"
        :default-expand-all=true
        @node-click="nodeClick"
        node-key="id"
        class="classify-tree">
      </el-tree>
    </el-col>
    <el-col :span="12">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
         <el-input type="hidden" v-model="ruleForm.id"></el-input>
         <el-input type="hidden" v-model="ruleForm.pid"></el-input>
          <el-form-item label="上级名称" prop="pid">
            <el-select v-model="ruleForm.pid" placeholder="请选择上级分类">
              <el-option v-for="item in catMenus" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="级别">
            <el-input type="text" v-model="ruleForm.level" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item v-show="!handleButton">
            <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
            <el-button type="success" @click="classifySub">新增子分类</el-button>
            <el-button type="success" @click="classifyTop">新增顶级分类</el-button>
            <el-button type="danger" @click="classifyDelete(false)">删除</el-button>
          </el-form-item>
          <el-form-item v-show="handleButton">
            <el-button type="success" @click="submitForm('ruleForm')">新增</el-button>
            <el-button type="permary" @click="handleButton=false">取消</el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>
<script>
import breadCrumb from './BreadCrumb'
import * as api from '../../api'
import * as handle from '../common/handle'
export default {
  components: {
    breadCrumb
  },
  data () {
    return {
      tableData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      catMenus: [], // 分类下拉
      // classifyData: [],
      handleButton: false,
      ruleForm: {
        id: '',
        name: '',
        level: '',
        pid: '',
        address: '',
        pName: '顶级分类'
      },
      rules: {
        name: [{
          required: true, message: '请输入名称', trigger: 'blur'
        }],
        pid: [{
          type: 'number', required: true, message: '请选择上级分类', trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getTable()
  },
  methods: {
    // 获取组织树
    getTable () {
      var _this = this
      api.categoryList()
        .then(data => {
          if (data.code === 1) {
            _this.tableData = data.data.treeData
            _this.catMenus = data.data.menusData
            // _this.classifyData = data.data.classifyData
          } else if (data.code === 0) {
            this.$message({
              message: data.msg,
              duration: 1000,
              type: 'error'
            })
          }
        })
    },
    // 组织新增修改
    submitForm (formName) {
      var _this = this
      // 如果不存在level，那么说明不是新增顶级分类里面的并且没有点击左侧树形结构
      if (!_this.ruleForm.level) {
        _this.$message.error('请先选择组织架构，再修改')
      }
      // 验证表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.ruleForm.pid === 0) {
            _this.ruleForm.pid = 0
            _this.ruleForm.level = '1'
          }
          api.categoryInsert(this.ruleForm)
            .then(data => {
              if (data.code === 1) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    // 清空数据
                    _this.ruleForm = handle.formClean(_this.ruleForm)
                    // 重新获取数据
                    _this.getTable()
                    _this.handleButton = false
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
    // 组织架构删除
    classifyDelete (tag) {
      // tag 为true时，删除组织架构并且删除该组织架构下的所有用户，为false，发起普通删除请求
      tag = tag || false
      var _this = this
      api.categoryDelt({id: this.ruleForm.id, tag: tag})
        .then(data => {
          if (data.code === 1) {
            this.$message({
              message: data.msg,
              type: 'success',
              duration: 1000,
              onClose: () => {
                // 清空数据
                _this.ruleForm = handle.formClean(_this.ruleForm)
                // 重新获取数据
                _this.getTable()
              }
            })
          } else if (data.code === 0) {
            // 当该组织架构下有用户是，弹窗询问用户是否继续删除
            _this.$confirm(data.msg, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.classifyDelete(true)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }
        })
    },
    // 新增顶级分类
    classifyTop () {
      this.ruleForm.id = ''
      this.ruleForm.name = ''
      this.ruleForm.level = '1'
      this.ruleForm.pid = 0
      this.ruleForm.address = ''
      this.ruleForm.pName = '顶级分类'
      this.handleButton = true
    },
    // 新增子分类
    classifySub () {
      if (this.ruleForm.id) {
        this.ruleForm.pid = this.ruleForm.id
        this.ruleForm.id = ''
        // this.ruleForm.pName = this.ruleForm.name
        this.ruleForm.name = ''
        this.ruleForm.level++
        this.ruleForm.address = ''
        this.handleButton = true
      } else {
        this.$message.error('请先在左侧选择该子分类的父级，然后再点击新增子分类')
      }
    },
    // 树结构点击
    nodeClick (data, node) {
      for (var x in this.ruleForm) {
        if (data.hasOwnProperty(x)) {
          if (x === 'pName' && data[x] === null) {
            data[x] = '顶级分类'
          }
          this.ruleForm[x] = data[x]
        }
      }
    }
  }
}
</script>
<style lang="">
  .classify-tree{
    margin-top: 2em
  }
</style>
