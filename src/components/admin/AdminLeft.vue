<template>
  <div class="admin-left">
    <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
    <el-menu default-active="4-1" class="el-menu-vertical-demo" :default-openeds="openMenus">
      <el-submenu  v-for="item in menus" :key="item.indexes" :index="item.indexes">
        <template slot="title"><i :class="['iconfont',item.icon]"></i>{{item.name}}</template>
        <router-link v-for="sub in item.children" :to="sub.url" :key="sub.indexes"><el-menu-item :index="sub.indexes">{{sub.name}}</el-menu-item></router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'admin-left',
  data () {
    return {
      // 左侧菜单栏数据
      menus: [{
        name: '用户管理',
        indexes: '1',
        icon: '123',
        children: [{
          name: '用户列表',
          indexes: '1-1',
          url: '/admin/user'
        }]
      }, {
        name: '分类管理',
        indexes: '2',
        icon: '123',
        children: [{
          name: '分类列表',
          indexes: '2-1',
          url: '/admin/category'
        }]
      }, {
        name: '标签管理',
        indexes: '3',
        icon: '123',
        children: [{
          name: '标签列表',
          indexes: '3-1',
          url: '/admin/tag'
        }]
      }, {
        name: '文章管理',
        indexes: '4',
        icon: '123',
        children: [{
          name: '文章礼拜',
          indexes: '4-1',
          url: '/admin/article'
        }]
      }, {
        name: '系统设置',
        indexes: '5',
        icon: '123',
        children: [{
          name: '参数配置',
          indexes: '5-1',
          url: '/admin/systemParams'
        }]
      }],
      // 默认打开菜单的key
      openMenus: ['1-1']
    }
  },
  created: function () {
  },
  methods: {
    handleNodeClick (data) {
      if (data.hasOwnProperty('url')) {
        this.$router.push(data.url)
      }
    }
  }
}
</script>
<style>
  .admin-left{
    width: 100%;
    background-color: #eef1f6
  }
  .admin-left a{
    text-decoration: none;
    color: #48576a;
  }
  .admin-left .iconfont{
    font-size: 22px;
    margin-right: 5px;
  }
</style>
