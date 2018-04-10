<template>
  <el-row class="bread-crumb-content">
    <el-col :span="24">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in crumbData" :key="item.index">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      crumbData: []
    }
  },
  created () {
    switch (this.$route.path) {
      case '/admin/userList':
        this.crumbData = [{
          name: '用户管理'
        }, {
          name: '用户列表'
        }]
        break
      case '/admin/cusOrg':
        this.crumbData = [{
          name: '客户管理'
        }, {
          name: '客户组织架构管理'
        }]
        break
      case '/admin/cusList':
        this.crumbData = [{
          name: '客户管理'
        }, {
          name: '客户列表'
        }]
        break
      case '/admin/proClass':
        this.crumbData = [{
          name: '商品管理'
        }, {
          name: '商品分类'
        }]
        break
      case '/admin/proList':
        this.crumbData = [{
          name: '商品管理'
        }, {
          name: '商品列表'
        }]
        break
      case '/admin/orderList':
        this.crumbData = [{
          name: '订单管理'
        }, {
          name: '订单列表'
        }]
        break
      case '/admin/systemParams':
        this.crumbData = [{
          name: '系统管理'
        }, {
          name: '参数配置'
        }]
        break
    }
  }
}
</script>
<style lang="">
</style>
