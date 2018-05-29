<template lang="html">
  <div class="index-class">
    <div class="index-home" :style="homeStyle">
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
        <!-- 内容页 -->
        <el-col :span="24">
          <div class="index-content">
            <router-view></router-view>
          </div>
        </el-col>
        <!-- 侧边栏按钮 -->
        <div class="sider-icon">
          <div class="sider-info" @click="showUserInfo">
            <i class="iconfont icon-fenlei1"></i>
          </div>
          <div class="sider-top">
            <i class="iconfont icon-fanhuidingbu"></i>
          </div>
        </div>
      </el-row>
    </div>
    <div class="index-info" :style="menusStyle">
      <indexInfo></indexInfo>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    indexInfo: () => import('../userInfo/IndexInfo')
  },
  data () {
    return {
      homeStyle: {'paddingRight': '0px'},
      menusStyle: {'width': '0px'}
    }
  },
  methods: {
    showUserInfo () {
      if (this.homeStyle.paddingRight === '0px') {
        this.homeStyle = {'paddingRight': '320px'}
        this.menusStyle = {'width': '320px'}
      } else {
        this.homeStyle = {'paddingRight': '0px'}
        this.menusStyle = {'width': '0px'}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
