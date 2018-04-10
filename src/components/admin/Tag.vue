<template>
  <el-row>
    <el-col :span="24">
      <bread-crumb></bread-crumb>
    </el-col>
    <el-col :span="24">
      <el-row class="nav-search">
        <el-col :span="24">
          <el-select v-model="keyword.display" placeholder="请选择">
            <el-option label="全部(橱窗推荐)" value=""></el-option>
            <el-option label="已推荐" value="1"></el-option>
            <el-option label="未推荐" value="0"></el-option>
          </el-select>
          <el-select v-model="keyword.sell" placeholder="请选择">
            <el-option label="上下架" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="未上架" value="0"></el-option>
          </el-select>
          <el-select v-model="keyword.classifyId" placeholder="请选择">
            <el-option label="全部分类" value=""></el-option>
            <el-option
              v-for="item in menusData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <div class="product-input">
            <el-input v-model="keyword.keyword" placeholder="输入商品名称和代码检索" class="keyword-input" @keyup.enter.native="getTable(1,keyword)"></el-input>
          </div>
          <el-button type="primary" @click="getTable(1,keyword)"><i class="iconfont iconfont-handle icon-sousuo_sousuo"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="nav-handle">
      <el-button type="danger" @click="allDelete"><i class="iconfont iconfont-handle icon-shanchu"></i>批量删除</el-button>
      <el-button type="info" @click="allUpSell('up')"><i class="iconfont iconfont-handle icon-ccgl-shangjiasaomiao-7"></i>批量上架</el-button>
      <el-button type="primary" @click="allUpSell('down')"><i class="iconfont iconfont-handle icon-xiajia"></i>批量下架</el-button>
      <el-button type="success" @click="productAdd"><i class="iconfont iconfont-handle icon-xinzeng1"></i>新增</el-button>
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
          prop="code"
          label="商品代码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          minWidth="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="classifyName"
          label="所属分类"
          width="150">
        </el-table-column>
        <el-table-column
          prop="scale"
          label="中收比例"
          width="150">
        </el-table-column>
         <el-table-column
          prop="sell"
          label="是否上架"
          width="150">
          <template slot-scope="scope">
            <el-tag
            :type="scope.row.sell === '1' ? 'success' : 'danger'"
            close-transition>{{scope.row.sell == '1' ?'已上架' : '未上架'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
         prop="sell"
         label="橱窗位"
         width="150">
         <template slot-scope="scope">
           <el-tag
           :type="scope.row.display === '1' ? 'success' : 'danger'"
           close-transition>{{scope.row.display == '1' ?'已推荐' : '未推荐'}}</el-tag>
         </template>
       </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="upSell(scope)">{{scope.row.sell == '1' ?'下架' : '上架'}}</el-button>
            <el-button type="text" size="small" @click="editCommon(scope)">编辑</el-button>
            <el-button type="text" size="small" @click="rowDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <pagination :total="total" :currentPage="1" :currentChange="getTable"></pagination>
    </el-col>
    <el-col :span="24">
      <el-dialog
      title="商品信息"
      :visible.sync="dialogTag"
      :before-close="dialogClose"
      size="small">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-input type="hidden" v-model="ruleForm.id"></el-input>
          <el-form-item label="商品代码" prop="code">
            <el-input type="text" v-model="ruleForm.code" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格(元)" prop="price">
            <el-input type="text" v-model.number="ruleForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="中收比例" prop="scale">
            <el-input type="text" v-model="ruleForm.scale" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="发行单位">
            <el-input type="text" v-model="ruleForm.issuer" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品材质">
            <el-input type="text" v-model="ruleForm.material" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-input type="text" v-model="ruleForm.size" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品单位">
            <el-input type="text" v-model="ruleForm.unit" auto-complete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="首图" prop="imgUrl">
            <ImageUpload :setVal="setImgUrl" :imgVal="ruleForm.imgVal"></ImageUpload>
            <span>首图建议尺寸宽800像素*高600像素</span>
          </el-form-item>
          <el-form-item label="所属分类" prop="classifyId">
            <el-select v-model="ruleForm.classifyId" filterable placeholder="请选择">
              <el-option v-for="item in menusData" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否上架" prop="sell">
            <el-select v-model="ruleForm.sell" filterable placeholder="请选择">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="橱窗位推荐" prop="display">
            <el-select v-model="ruleForm.display" filterable placeholder="请选择">
              <el-option label="推荐" value="1"></el-option>
              <el-option label="不推荐" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图文详情">
              <wangEditor :info="ruleForm.info" :getVal="getVal" :reset="editorReset"></wangEditor>
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
import wangEditor from './Editor'
import ImageUpload from './ImageUpload'
import * as api from '../../api'
export default {
  components: {
    breadCrumb,
    pagination,
    wangEditor,
    ImageUpload
  },
  data () {
    return {
      tableData: [],
      total: 0,
      keyword: {
        keyword: '',
        sell: '', // 搜索上下架
        display: '', // 橱窗位推荐
        classifyId: '' // 搜索分类ID
      },
      menusData: [], // 下拉菜单
      multipleSelection: [], // 全选
      dialogTag: false, // 新增修改弹窗
      editorReset: new Date(), // 重置富文本标签
      dialogImage: false,
      ruleForm: {
        id: '',
        code: '', // 商品代码
        name: '', // 商品名称
        price: '', // 商品价格
        imgUrl: '', // 首图地址
        classifyId: '', // 分类ID
        info: '', // 商品详情
        issuer: '', // 发行单位
        size: '', // 商品重量
        unit: '', // 商品单位
        sell: '1', // 是否上架
        imgVal: [], // 传入首图组件的值
        display: '0', // 橱窗位推荐
        scale: '' // 中收比例
      },
      rules: {
        code: [{
          required: true, message: '请输入商品代码', trigger: 'blur'
        }],
        name: [{
          required: true, message: '请输入商品名称', trigger: 'blur'
        }],
        price: [{
          type: 'number', required: true, message: '请输入商品价格', trigger: 'blur'
        }],
        scale: [{
          required: true, message: '请输入中收比例', trigger: 'blur'
        }],
        imgUrl: [{
          required: true, message: '请上传商品首图', trigger: 'blur'
        }],
        classifyId: [{
          type: 'number', required: true, message: '请选择商品分类', trigger: 'blur'
        }],
        sell: [{
          required: true, message: '请选择上架状态', trigger: 'blur'
        }],
        display: [{
          required: true, message: '请选择橱窗位状态', trigger: 'blur'
        }]
      }
    }
  },
  created () {
    // 获取table数据
    this.getTable()
    // 获取分类菜单数据
    this.getMenus()
  },
  methods: {
    // 设置富文本的值
    getVal (text) {
      this.ruleForm.info = text
    },
    // 设置首图的值
    setImgUrl (url) {
      this.ruleForm.imgUrl = url
    },
    // 获取table数据
    getTable (page, keyword) {
      page = page || 1
      keyword = this.keyword
      api.tagList({
        page: page,
        limit: 10,
        keyword: keyword
      })
        .then(data => {
          if (data.code === 1) {
            this.tableData = data.data.tableData
            this.total = data.data.total
          }
        })
    },
    // 获取下拉菜单
    getMenus () {
    },
    // 全选标签
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 关闭弹窗
    dialogClose (done) {
      done()
    },
    // 删除商品
    rowDelete (obj) {
      this.$confirm('确定删除客户：' + obj.row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCommon(obj.row.id, obj)
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
      this.$confirm('确定删除商品：' + names.join(), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认后调用全部删除
        this.deleteCommon(ids.join())
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除公共函数
    deleteCommon (ids, obj) {
      var _this = this
      api.tagDelt({id: ids})
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
    // 新增界面
    productAdd () {
      this.editorReset = new Date()
      for (let x in this.ruleForm) {
        switch (x) {
          case 'imgVal':
            this.ruleForm[x] = []
            break
          case 'sell':
            this.ruleForm[x] = '1'
            break
          default:
            this.ruleForm[x] = ''
            break
        }
      }
      this.dialogTag = true
    },
    // 编辑界面
    editCommon (obj) {
      var _this = this
      for (let i = 0; i < _this.tableData.length; i++) {
        if (_this.tableData[i].id === obj.row.id) {
          // 循环表单对象
          for (let x in _this.ruleForm) {
            if (x === 'imgVal') {
              this.ruleForm.imgVal = []
              this.ruleForm.imgVal.push({name: 'img', url: _this.tableData[i]['imgUrl']})
            } else {
              _this.ruleForm[x] = _this.tableData[i][x]
            }
          }
          _this.editorReset = new Date()
          _this.dialogTag = true
        }
      }
    },
    // 上下架操作
    upSell (obj) {
    },
    // 批量上下架处理
    allUpSell (tag) {
    },
    // 商品新增修改提交方法
    submitForm (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.tagInsert(this.ruleForm)
            .then(data => {
              if (data.code === 1) {
                this.$message({
                  message: data.msg,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    // 关闭弹窗
                    _this.dialogTag = false
                    // 重新获取数据
                    _this.getTable()
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
  .product-input{
    display: inline-block;
    width: 200px;
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
