<!-- 分页封装模板，传入三个参数：
sizeChange 每页显示条数修改时的回调  function
currentChange 当前页码修改时的回调   function
currentPage 当前页  num
total 总条数  num-->
<template>
  <div class="block tpl-pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPages"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
// 引入分页可配常量参数
export default {
  data () {
    return {
      // 每页显示条数
      pageSizes: [10, 20, 30, 50],
      // 当前选中每页显示条数
      pageSize: 10,
      // 显示的组件
      layout: 'total, jumper, next, pager, prev',
      // // 当前页码
      currentPages: this.currentPage
    }
  },
  watch: {
    setIndex: function (val, oldVal) {
      this.currentPages = 1
    }
  },
  // 父组件传入的参数
  props: ['currentChange', 'currentPage', 'total', 'setIndex'],
  methods: {
    // 每页显示的条数回调函数 size为条数
    handleSizeChange: function (size) {
      // 将当前条数赋值给data类
      this.pageSize = size
      // 调用显示条数回调函数，将当前页码和显示的条数作为实参传入
      this.sizeChange(this.currentPages, this.pageSize)
    },
    // 当前页码修改时的回调函数，currentPage为当前页
    handleCurrentChange: function (currentPage) {
      // 将当前页赋值给data类
      this.currentPages = currentPage
      console.log(currentPage)
      // 调用修改当前页后的回调函数，将当前页和显示的条数作为实参传入
      this.currentChange(this.currentPages)
    }
  }
}
</script>
<style>
  .tpl-pagination{
    text-align: center;
    margin-top: 15px;
  }
  .tpl-pagination .el-pagination__total,.tpl-pagination .el-pagination__sizes{
    float: left;
  }
  .tpl-pagination .btn-prev,.tpl-pagination .el-pager,.tpl-pagination .btn-next,.tpl-pagination .el-pagination__jump{
    float: right;
  }
</style>
