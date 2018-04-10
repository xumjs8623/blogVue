<template>
  <el-row>
    <el-col :span="24">
      <bread-crumb></bread-crumb>
    </el-col>
    <el-col :span="24">
      <el-row>
        <el-col :span="24" class="nav-search">
          <!-- 订单状态 -->
          <div class="order-search-nav">
            <el-select v-model="keyword.state" placeholder="请选择">
              <el-option label="全部订单状态" value=""></el-option>
              <el-option label="未确认" value="1"></el-option>
              <el-option label="确认" value="2"></el-option>
              <el-option label="已发货" value="3"></el-option>
              <el-option label="完结" value="4"></el-option>
            </el-select>
          </div>
          <!-- 时间区间 -->
          <div class="order-search-nav">
            <el-date-picker
              v-model="keyword.timeSort"
              type="datetimerange"
              :picker-options="pickerOptions2"
              placeholder="选择时间范围"
              align="right">
            </el-date-picker>
          </div>
          <!-- 关键词 -->
          <div class="order-input order-search-nav">
            <el-input v-model="keyword.word" placeholder="输入订单编号、收货人姓名、收货人手机号、网点名称进行查询" class="keyword-input" @keyup.enter.native="getTable(1,keyword)"></el-input>
          </div>
          <el-button type="primary" @click="getTable(1,keyword)" class="order-search-nav"><i class="iconfont iconfont-handle icon-sousuo_sousuo"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="24" class="nav-handle">
      <el-button type="danger" @click = "allDelete"><i class="iconfont iconfont-handle icon-shanchu"></i>批量删除</el-button>
      <el-button type="primary" @click = "exportExcel"><i class="iconfont iconfont-handle icon-daochu"></i>导出</el-button>
    </el-col>
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @row-click="rowClick"
        @selection-change="handleSelectionChange">
        <!--隐藏数据-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-col :span="24">
              <el-row class="order-hidden-info">
                <el-col :span="12">
                  <span>下单时间： {{ props.row.createTime }}</span>
                </el-col>
                <el-col :span="12">
                  <span>开票抬头： {{ props.row.billHeader }}</span>
                </el-col>
                <el-col :span="12">
                  <span>税号： {{ props.row.taxesNum }}</span>
                </el-col>
                <el-col :span="12">
                  <span>收货人姓名： {{ props.row.acceptName }}</span>
                </el-col>
                <el-col :span="12">
                  <span>收货人联系方式： {{ props.row.acceptTel }}</span>
                </el-col>
                <el-col :span="12">
                  <span>收货地址： {{ props.row.acceptAddress }}</span>
                </el-col>
                <el-col :span="12">
                  <span>开票地址： {{ props.row.billAddress }}</span>
                </el-col>
                <el-col :span="12">
                  <span>开票电话： {{ props.row.billPhone }}</span>
                </el-col>
                <el-col :span="12">
                  <span>开户行： {{ props.row.billBank }}</span>
                </el-col>
                <el-col :span="12">
                  <span>账号： {{ props.row.billCountNumber }}</span>
                </el-col>
                <el-col :span="12">
                  <span>交易机构信息： {{ props.row.trading }}</span>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-table
              border
              :data="props.row.product"
              show-summary
              :summary-method="getSummaries"
              style="width:100%"
              >
                <el-table-column label="订单包含的商品信息">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="商品编码"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="商品单价">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="商品来源">
                    <template slot-scope="scope">
                      <template v-if="scope.row.type === '1'">
                        <el-tag type="primary" close-transition>订单</el-tag>
                      </template>
                      <template v-if="scope.row.type === '2'">
                        <el-tag type="gray" close-transition>赠品</el-tag>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="productCount"
                    label="商品数量">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="no"
          label="订单编号"
          min-width="125">
        </el-table-column>
         <el-table-column
          prop="orgName"
          label="网点名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="acceptName"
          label="收货人"
          min-width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="acceptTel"
          label="收货人手机号"
          min-width="130">
        </el-table-column> -->
        <el-table-column
          prop="expressNM"
          label="物流编号"
          width="150">
          <template slot-scope="scope">
            <el-tooltip placement="bottom" effect="light">
              <div slot="content"><span v-for="item in expressInfo" :key="item.index">{{item.time}} {{item.address}}<br/></span></div>
              <p class="expressNm-span" @mouseenter="getExpress(scope)">{{scope.row.expressNM}}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="订单状态"
          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.state === '1'">
              <el-tag type="danger" close-transition>未确认</el-tag>
            </template>
            <template v-if="scope.row.state === '2'">
              <el-tag type="gray" close-transition>已付款</el-tag>
            </template>
            <template v-if="scope.row.state === '3'">
              <el-tag type="primary" close-transition>已发货</el-tag>
            </template>
            <template v-if="scope.row.state === '4'">
              <el-tag type="success" close-transition>已经完结</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="moneySum"
          label="金额(元)"
          min-width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="confirmData(scope)">确认</el-button>
            <el-button type="text" size="small" @click="delivery(scope)">发货</el-button>
            <el-button type="text" size="small" @click="finish(scope)">完结</el-button>
            <el-dropdown class="handle-dropdown" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-button type="text" size="small">更多</el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="handle-dropdown-item" :command="'gift,'+scope.row.id"><el-button type="text" size="small">赠品</el-button></el-dropdown-item>
                <el-dropdown-item class="handle-dropdown-item" :command="'editor,'+scope.row.id"><el-button type="text" size="small">编辑</el-button></el-dropdown-item>
                <el-dropdown-item class="handle-dropdown-item" :command="'delete,'+scope.row.id"><el-button type="text" size="small">删除</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 分页 -->
    <el-col :span="24">
      <pagination :total="total" :currentPage="1" :currentChange="getTable"></pagination>
    </el-col>
    <!-- 新增赠品弹窗 -->
    <el-col :span="24">
      <el-dialog
        :title="'订单编号:' + gift.orderNo + ' 所属赠品'"
        :visible.sync="gift.transferTag"
        size="small"
        class="order-giftDialog">
        <el-row>
          <!-- 赠品搜索框 -->
          <el-col :span="24" class="order-gifter-search">
            <div class="order-gift-input">
              <el-input v-model="gift.keyword.keyword" placeholder="商品名称、商品编码搜索" class="keyword-input" @keyup.enter.native="giftSearch(keyword)"></el-input>
            </div>
            <el-button type="primary" @click="giftSearch(keyword)"><i class="iconfont iconfont-handle icon-sousuo_sousuo"></i>搜索</el-button>
          </el-col>
          <!-- 赠品table -->
          <el-table
            :data="gift.allProduct"
            border
            style="100%">
            <el-table-column  prop="code" label="商品编号"></el-table-column>
            <el-table-column  prop="name" label="商品名称"></el-table-column>
            <el-table-column  prop="id" label="赠品数量">
              <template slot-scope="scope">
                <template v-if="scope.row.productCount === '0'">
                  <el-tag type="danger" close-transition>未添加</el-tag>
                </template>
                <template v-else>
                  <el-tag type="success" close-transition>已添加 *{{scope.row.productCount}}</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column  prop="id" label="操作">
              <template slot-scope="scope">
                <template v-if="scope.row.productCount === '0'">
                  <el-button type="text" size="small" @click="giftAddNum(scope.row.id, scope.row.productCount)">添加</el-button>
                </template>
                <template v-else>
                  <el-button type="text" size="small" @click="giftAddNum(scope.row.id, scope.row.productCount)">修改数量</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-dialog>
    </el-col>
    <!-- 订单修改弹窗 -->
    <el-col :span="24">
      <el-dialog
      title="订单信息"
      :visible.sync="dialogTag"
      :before-close="dialogClose"
      size="small">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
         <el-input type="hidden" v-model="ruleForm.id"></el-input>
         <el-input type="hidden" v-model="ruleForm.prodId"></el-input>
          <el-form-item label="商品集合" prop="prodId">
            <div class="product-tag">
              <el-tag v-for="item in productTag" :key="item.id">{{item.name}}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="收货人" prop="acceptName">
            <el-input type="text" v-model="ruleForm.acceptName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人地址" prop="acceptAddress">
            <el-input type="text" v-model="ruleForm.acceptAddress" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="收货人手机号" prop="acceptTel">
            <el-input type="text" v-model="ruleForm.acceptTel" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="state">
            <el-select v-model="ruleForm.state" filterable placeholder="请选择">
              <el-option label="未确认" value="1"></el-option>
              <el-option label="已确认" value="2"></el-option>
              <el-option label="已发货" value="3"></el-option>
              <el-option label="已完结" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开票类型" prop="billType">
            <el-input type="text" v-model="ruleForm.billType" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="开票抬头" prop="billType">
            <el-input type="text" v-model="ruleForm.billHeader" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="物流编号" prop="expressNM">
            <el-input type="text" v-model="ruleForm.expressNM" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="金额(元)" prop="moneySum">
            <el-input type="text" v-model="ruleForm.moneySum" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="网点名称">
            <el-input type="text" v-model="ruleForm.customerName" :disabled="true" auto-complete="off"></el-input>
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
      keyword: {
        word: '',
        timeSort: '',
        state: ''
      },
      // 赠品
      gift: {
        keyword: {
          keyword: '',
          sell: '', // 搜索上下架
          classifyId: '' // 搜索分类ID
        }, // 搜索关键词
        orderNo: '', // 当前订单编号
        allProduct: [], // 所有商品
        giftOrderId: '', // 当前赠品界面订单id
        giftData: [], // 需要传递到后端的赠品数据
        transferTag: false // 穿梭框弹窗标签
      },
      multipleSelection: [], // 全选
      dialogTag: false, // 新增修改弹窗
      expressInfo: [{time: '', address: '加载中···'}],
      productTag: [], // 编辑界面，商品tag展示数组
      ruleForm: {
        id: '',
        prodId: '', // 商品集合
        acceptName: '', // 收货人
        acceptAddress: '', // 收货人地址
        acceptTel: '', // 收货人手机号
        state: '', // 订单状态
        billType: '', // 开票类型
        billHeader: '', // 开票抬头
        expressNM: '', // 物流编号
        moneySum: '', // 金额
        customerId: '',
        customerName: '' // 客户名称
      },
      rules: {
        acceptName: [{
          required: true, message: '请输入收货人', trigger: 'blur'
        }],
        acceptAddress: [{
          required: true, message: '请输入收货地址', trigger: 'blur'
        }],
        acceptTel: [{
          required: true, message: '请输入收货手机号', trigger: 'blur'
        }],
        state: [{
          required: true, message: '请选择订单状态', trigger: 'blur'
        }],
        moneySum: [{
          required: true, message: '请输入订单金额', trigger: 'blur'
        }]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
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
      keyword = this.keyword
      api.articleList({
        page: page,
        limit: 10,
        keyword: keyword
      })
        .then(data => {
          if (data.code === 1) {
            for (let i = 0; i < data.data.tableData.length; i++) {
              data.data.tableData[i]['product'] = []
            }
            this.tableData = data.data.tableData
            this.total = data.data.total
          }
        })
    },
    // 点击行以后获取商品信息
    rowClick (row, event, column) {
      this.getProductInfo(row.id, 'tableProduct')
    },
    // 赠品提交数目选择
    giftAddNum (productId, productCount) {
    },
    // 赠品提交
    submitGift () {
    },
    // 赠品搜索
    giftSearch () {
      // 所有商品为空
      this.gift.allProduct = []
      this.getProductInfo(this.gift.giftOrderId, 'giftProduct')
    },
    // 新增赠品弹窗
    addGift (orderId) {
      for (let i = 0, length = this.tableData.length; i < length; i++) {
        if (String(this.tableData[i].id) === String(orderId)) {
          this.gift.orderNo = this.tableData[i].no
        }
      }
      // 设置所有商品为空
      this.gift.allProduct = []
      // 设置需要提交的赠品信息为空
      this.gift.giftData = []
      // 设置该赠品所属订单id
      this.gift.giftOrderId = orderId
      // 获取已有赠品,在回调内获取所有商品
      this.getProductInfo(orderId, 'giftProduct')
      // 设置弹窗标签为true
      this.gift.transferTag = true
    },
    // 根据订单id获取商品信息
    getProductInfo (orderId, tag) {
    },
    // 获取全部商品
    getAllProduct () {
    },
    // 导出excel
    exportExcel () {
    },
    // 获取物流信息
    getExpress (obj) {
    },
    // 点击table中的操作菜单集合 下拉按钮
    handleCommand (val) {
      var handleArr = String(val).split(',')
      switch (handleArr[0]) {
        case 'editor':
          this.editCommon(handleArr[1])
          break
        case 'delete':
          this.rowDelete(handleArr[1])
          break
        case 'gift':
          this.addGift(handleArr[1])
          break
        default:
      }
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
    // 确认操作
    confirmData (obj) {
    },
    // 发货操作
    delivery (obj) {
    },
    // 完结操作
    finish (obj) {
    },
    // 删除订单
    rowDelete (id) {
      var obj = {}
      // 设置删除标签为false
      var deltTag = false
      for (let i = 0; i < this.tableData.length; i++) {
        if ((String(this.tableData[i].id) === String(id)) && (Number(this.tableData[i].state) === 1)) {
          obj = this.tableData[i]
          // 如果在tableData中找到了该ID,那么设置删标签为true
          deltTag = true
        }
      }
      if (deltTag) {
        this.$confirm('确定删除订单：' + obj.no, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCommon(id, obj)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message.error('非未确认订单，无法删除')
      }
    },
    // 全部删除
    allDelete () {
      // id集合
      var ids = []
      // 设置状态标签为false，如果所有订单中有一个不是未确认订单，那么设置为true，弹出弹窗
      var stateTag = false
      for (var i = 0; i < this.multipleSelection.length; i++) {
        // 循环全选数组内，将id和名称提取出来
        ids.push(this.multipleSelection[i].id)
        if (Number(this.multipleSelection[i].state) > 1) {
          stateTag = true
        }
      }
      // 如果有不是未确认的订单，那么提示用户无法批量删除
      if (stateTag) {
        this.$message.error('无法批量删除,所选订单中包含未确认外的订单')
      } else {
        this.$confirm('确定删除所选订单', '提示', {
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
      }
    },
    // 删除公共函数
    deleteCommon (ids, obj) {
      var _this = this
      api.articleDelt({id: ids})
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
    // 编辑界面
    editCommon (id) {
    },
    // 订单新增修改
    submitForm (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.articleInsert(this.ruleForm)
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
    // table合计
    getSummaries (param) {
      console.log('合计')
      console.log(param)
      const {columns, data} = param
      var sums = []
      columns.forEach((value, index) => {
        // 循环取到的列名
        if (index === 0) {
          // 第一列取名为合计
          sums.push('合计')
        } else {
          switch (value.property) {
            case 'name':
              // 若为商品名称，则不进行统计
              sums.push('/')
              break
            case 'code':
              // 若为商品代码，则不进行统计
              sums.push('/')
              break
            case 'type':
              // 若为商品类型，则不进行统计
              sums.push('/')
              break
            default:
              var sum = 0
              data.map(item => {
                // 循环数据，将该值合计起来
                sum += Number(item[value.property])
              })
              sums.push(sum)
          }
        }
      })
      return sums
    }
  }
}
</script>
<style>
  .order-state-select{
    width: 110px;
  }
  .nav-search{
    margin-top:20px;
    margin-bottom:20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .order-input{
    display: inline-block;
    width: 440px;
  }
  .order-search-nav {
    padding:0 10px;
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
  .handle-dropdown{
    margin-left: 10px;
  }
  .handle-dropdown-item{
    text-align: center
  }
  .product-tag{
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #1f2d3d;
    padding: 0px 10px;
  }
  .product-tag .el-tag{
    margin-right: 10px;
  }
  .expressNm-span{
    cursor: pointer;
  }
  .order-transfer {
    display: inline-block;
    text-align: left;
  }
  .order-giftDialog{
    text-align: center;
  }
  .order-transfer-button{
    margin-top: 20px;
  }
  .order-gift-input{
    display: inline-block;
    width: 400px;
  }
  .order-gifter-search{
    margin-bottom: 20px;
  }
  .order-hidden-info{
    text-align: left;
  }
  .order-hidden-info span {
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
  }
</style>
