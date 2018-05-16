<template>
<!-- 传入参数
tableFrame 表格结构 Object  {label 字段中文名 String, prop 字段名称 String, minWidth 最小宽度 String}
apiAddress api请求地址 String
searchKeyword 搜索关键词 Object
searchTag 是否执行搜索 Boolean
dbClick 双击事件 传入row参数 Function
height table 高度 String
privilegeId 权限id String
-->
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData" border stripe :height="tableUserHeight" size="mini" class="common-talbe" ref="multipleTable" @selection-change="handleSelectionChange" highlight-current-row @row-click="handleCurrentChange" @row-dblclick="dbClickFun">
        <table-column v-bind="item" v-for="(item, key) in tableConfig" :key="key"></table-column>
      </el-table>
    </el-col>
    <el-col :span="24" class="common-page">
      <el-pagination
        @size-change="handleChangeSize"
        @current-change="handleChangeCurrent"
        :current-page="page.currPage"
        :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import tableColumn from './TableColumn'
import * as api from '@/api'
export default {
  components: {
    tableColumn
  },
  data () {
    return {
      tableData: [],
      pages: {
        total: 0
      }
      // tableConfig: [{
      //   cellType: 'slots',
      //   prop: 'outTradeNo',
      //   label: '编号（ID）',
      //   renderCell: (scope) => {
      //     return (
      //       <el-button type="text">
      //         { scope.row.outTradeNo }
      //       </el-button>
      //     )
      //   }
      // }]
    }
  },
  computed: {
    ...mapGetters({
      page: 'getPage', // 分页数据
      multipleSelection: 'getSlection', // 多选内容
      tableHeight: 'getTableHeight' // 获取table高度
    }),
    tableUserHeight: function () {
      let returnHeight = ''
      if (this.height !== undefined) {
        returnHeight = this.height
      } else {
        returnHeight = this.tableHeight
      }
      return returnHeight
    }
  },
  watch: {
    searchTag: function () {
      this.tableList()
    }
  },
  props: {
    tableConfig: {
      type: Array,
      required: true
    },
    // api地址
    apiAddress: {
      type: String,
      required: true
    },
    // 搜索关键词
    searchKeyword: {
      type: Object,
      required: true,
      validator: function (value) {
        let startTset = false
        let limitTest = false
        for (let x in value) {
          if (x.indexOf('page') !== -1) {
            startTset = true
          }
          if (x.indexOf('limit') !== -1) {
            limitTest = true
          }
        }
        return startTset && limitTest
      }
    },
    // 搜索标签
    searchTag: {
      type: Boolean,
      required: true
    },
    // 双击事件
    dbClick: {
      type: Function
    },
    // 高度
    height: {
      type: String
    },
    showPrivilege: {
      type: String
    }
  },
  created () {
    this.tableList()
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'changeCurrent',
      'changeSize',
      'setSelection'
    ]),
    // 获取列表信息
    tableList () {
      api[this.apiAddress](this.searchKeyword)
        .then(data => {
          if (data.code === 1) {
            this.tableData = data.data
            this.pages.total = data.total
          }
        })
    },
    // 双击事件
    dbClickFun (row, event) {
      if (this.showPrivilege) {
        let actionTag = false
        let privilegeIds = JSON.parse(sessionStorage.getItem('privilege'))
        for (let i = 0, len = privilegeIds.length; i < len; i++) {
          if (privilegeIds[i].actionId === this.showPrivilege) {
            actionTag = true
          }
        }
        if (actionTag) {
          this.dbClick(row, event)
        } else {
          this.dbClick([], event)
        }
      } else {
        this.dbClick(row, event)
      }
    },
    // 修改当前页
    handleChangeCurrent (currPage) {
      this.changeCurrent(currPage)
      this.searchKeyword.page = Number(currPage) - 1
      this.tableList()
    },
    // 修改每页条数
    handleChangeSize (size) {
      this.changeSize(size)
      this.searchKeyword.page = 0
      this.searchKeyword.limit = size
      this.tableList()
    },
    // 全选操作
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.setSelection(val)
    },
    // 单选操作
    handleCurrentChange (row) {
      this.$refs.multipleTable.clearSelection()
      this.$refs.multipleTable.toggleRowSelection(row)
    }
  }
}
</script>
<style scoped>
.common-page{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-talbe{
  border-top: solid 1px #ebeef5;
}
</style>
