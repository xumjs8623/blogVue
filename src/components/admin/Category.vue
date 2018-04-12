<template>
  <el-row>
    <el-col :span="24">
      <bread-crumb></bread-crumb>
    </el-col>
    <el-col :span="24">
    </el-col>
    <el-col :span="24" class="category-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="分类名称"
          prop="name"
          min-width="800"
          class="category-name"
          :formatter="formatter">
          <template slot-scope="scope">
            <template v-if="scope.row.level === 1 || scope.row.level === 0">
              {{scope.row.name}}
            </template>
            <template v-else-if="scope.row.level === 2">
              └┈┈ {{scope.row.name}}
            </template>
            <template v-else>
              <span :style="{display: 'inline-block', width: (scope.row.level-2) * 40 + 'px'}"></span>
              <span>└┈┈ {{scope.row.name}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="index" width="50"></el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.name === '全部分类'">
              <el-button type="text" @click="rowAdd(scope.row)">添加子分类</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="rowEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="rowAdd(scope.row)">添加子分类</el-button>
              <el-button type="text" @click="rowDelete(scope.row)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <el-dialog
      title="分类信息"
      :visible.sync="dialogTag"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-input type="hidden" v-model="ruleForm.id"></el-input>
          <el-form-item label="上级分类">
            <el-select v-model="ruleForm.pid" placeholder="">
              <el-option v-for="(item, index) in tableData" :key="index" :value="item.id" :label="item.name">
                <template v-if="item.level === 1 || item.level === 0">
                  {{item.name}}
                </template>
                <template v-else-if="item.level === 2">
                  └┈┈ {{item.name}}
                </template>
                <template v-else>
                  <span :style="{display: 'inline-block', width: (item.level-2) * 40 + 'px'}"></span>
                  <span>└┈┈ {{item.name}}</span>
                </template>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="index">
            <el-input type="text" v-model="ruleForm.index" auto-complete="off"></el-input>
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
import * as api from '../../api'
export default {
  components: {
    breadCrumb
  },
  data () {
    return {
      keyword: '', // 搜索关键词
      firstTableData: {
        id: 0,
        name: '全部分类',
        index: '0',
        level: 0
      },
      tableData: [],
      dialogTag: false, // 弹窗标签
      ruleForm: {
        id: '',
        pid: '',
        name: '',
        index: ''
      },
      rules: {
        name: [{
          required: true, message: '请输入名称', trigger: 'blur'
        }],
        index: [{
          required: true, message: '请输入排序', trigger: 'blur'
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
      api.categoryList()
        .then(data => {
          if (data.code) {
            this.tableData = data.data.listData
            this.tableData.unshift(this.firstTableData)
          }
        })
    },
    // 新增
    rowAdd (row) {
      this.dialogTag = true
      for (let x in this.ruleForm) {
        this.ruleForm[x] = ''
      }
      this.ruleForm.pid = row.id
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.ruleForm.id === '') {
          // 新增
          api.categoryInsert(this.ruleForm)
            .then(data => {
              if (data.code) {
                this.$message.success(data.msg)
                this.$message({
                  message: data.msg,
                  duration: 1500,
                  type: 'success'
                })
                this.dialogTag = false
                this.getTable()
              }
            })
        } else if (valid && this.ruleForm.id !== '') {
          // 修改
          api.categoryUpdate(this.ruleForm)
            .then(data => {
              if (data.code) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.dialogTag = false
                    this.getTable()
                  }
                })
              }
            })
        }
      })
    },
    // 删除
    rowDelete (row) {
      this.$confirm('此操作将删除分类(' + row.name + ')以及下属子分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.categoryDelt({id: Number(row.id)})
          .then(data => {
            if (data.code) {
              this.$message({
                message: data.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getTable()
                }
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改
    rowEdit (row) {
      for (let x in this.ruleForm) {
        this.ruleForm[x] = row[x]
      }
      this.dialogTag = true
    },
    // 分类名称格式化
    formatter (row, column) {
      if (row.level === 1 || row.level === 0) {
        return row.name
      } else if (row.level === 2) {
        return '└┈┈' + row.name
      } else {
        let str = '|'
        for (let i = 0; i < row.level; i++) {
          str += '&nbsp'
        }
        return str + '└┈┈' + row.name
      }
    }
  }
}
</script>
<style lang="">
  .category-table{
    margin-top: 2em;
  }
  .category-name{
    text-align: left;
  }
</style>
