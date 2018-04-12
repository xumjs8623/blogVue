<template>
  <div class="admin-left">
    <!--<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo">
      <el-submenu  v-for="item in menus" :key="item.index" :index="item.index">
        <template slot="title"><i :class="['iconfont',item.icon]"></i>{{item.name}}</template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="subItem.index" @click="setTabs(subItem)">{{subItem.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'admin-left',
  data () {
    return {
      // 左侧菜单栏数据
      menus: [{
        name: '用户管理',
        index: '1',
        icon: '123',
        children: [{
          name: '用户列表',
          index: '1-1',
          url: '/admin/user'
        }]
      }, {
        name: '分类管理',
        index: '2',
        icon: '123',
        children: [{
          name: '分类列表',
          index: '2-1',
          url: '/admin/category'
        }]
      }, {
        name: '标签管理',
        index: '3',
        icon: '123',
        children: [{
          name: '标签列表',
          index: '3-1',
          url: '/admin/tag'
        }]
      }, {
        name: '文章管理',
        index: '4',
        icon: '123',
        children: [{
          name: '文章列表',
          index: '4-1',
          url: '/admin/article'
        }]
      }, {
        name: '系统设置',
        index: '5',
        icon: '123',
        children: [{
          name: '参数配置',
          index: '5-1',
          url: '/admin/systemParams'
        }]
      }]
    }
  },
  computed: {
    ...mapGetters({
      activeIndex: 'getActiveIndex'
    })
  },
  created: function () {
  },
  methods: {
    ...mapActions([
      'addTabs'
    ]),
    setTabs (tabsItem) {
      this.addTabs(tabsItem)
      this.$router.push({path: tabsItem.url})
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
