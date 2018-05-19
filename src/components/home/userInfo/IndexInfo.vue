<template lang="html">
  <div class="index-info">
    <el-row>
      <!-- 头像 -->
      <el-col :span="24">
        <img src="" alt="">
      </el-col>
      <!-- 名称 -->
      <el-col :span="24">
        <span>MJ</span>
      </el-col>
      <!-- 统计 -->
      <el-col :span="24">
        <div class="article-count">
        </div>
        <div class="catergory-count">
        </div>
        <div class="tag-count">
        </div>
      </el-col>
      <!-- 个人连接 -->
      <el-col :span="24">
        <el-row>
          <!-- github -->
          <el-col :span="8"></el-col>
          <!-- 微博 -->
          <el-col :span="8"></el-col>
          <!-- 个人主页 -->
          <el-col :span="8"></el-col>
        </el-row>
      </el-col>
      <!-- 友情链接 -->
      <el-col :span="24">
        <el-col :span="8"></el-col>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.index-info {
  background-color: #262a30;
  width: 320px;
}
</style>
