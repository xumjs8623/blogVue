<template>
  <div class="admin">
    <div id="admin-head">
      <admin-head></admin-head>
    </div>
    <div id="admin-left">
      <menus-left></menus-left>
    </div>
    <div id="admin-content">
      <el-row>
        <el-col :span="24">
          <tabs></tabs>
        </el-col>
        <el-col :span="24">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import menusLeft from './AdminLeft'
import adminHead from './AdminHead'
import tabs from './Tabs'
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    menusLeft,
    adminHead,
    tabs
  }
}
</script>
<style>
  #admin-content{
    position: absolute;
    top: 50px;
    left: 200px;
    right: 0px;
    bottom: 0px;
    padding: 15px;
    background-color: #fff;
    overflow: auto;
  }
  #admin-left{
    position: absolute;
    top: 50px;
    left: 0px;
    width: 200px;
    bottom: 0px;
    background-color: #eef1f6;
    overflow: auto;
  }
  #admin-head{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
</style>
