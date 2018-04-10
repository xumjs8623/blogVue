<template>
  <div class="admin">
    <div id="admin-head">
      <admin-head></admin-head>
    </div>
    <div id="admin-left">
      <menus-left></menus-left>
    </div>
    <div id="admin-content">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
import menusLeft from './AdminLeft'
import adminHead from './AdminHead'
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  components: {
    menusLeft,
    adminHead
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
