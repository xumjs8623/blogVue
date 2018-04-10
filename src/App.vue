<template>
<div id="app">
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  font-weight: 300;
}

.iconfont-handle {
  margin-right: 3px;
}
</style>
