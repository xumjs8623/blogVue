<template lang="html">
  <el-row>
    <!-- 头部 -->
    <el-col :span="24" class="header">
      <div class="header-content">
        <el-row>
          <el-col :span="8">
            <div class="header-content-logo">
              <div class="line-left-right">
                <div class="line"></div>
              </div>
              <span class="title">MJ`home</span>
              <div class="line-right-left">
                <div class="line"></div>
              </div>
            </div>
          </el-col>
          <el-col :span="16" class="">
            <ul class="header-menus">
              <li>
                <i class="iconfont icon-ai-home"></i>
                <span>首页</span>
              </li>
              <li>
                <i class="iconfont icon-fenlei"></i>
                <span>分类</span>
              </li>
              <li>
                <i class="iconfont icon-biaoqian"></i>
                <span>标签</span>
              </li>
              <li>
                <i class="iconfont icon-shangwutubiao-"></i>
                <span>归档</span>
              </li>
              <li>
                <i class="iconfont icon-guanyuwomen"></i>
                <span>关于</span>
              </li>
              <li>
                <i class="iconfont icon-qita"></i>
                <span>其他</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="24">
      <div class="index-content">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
