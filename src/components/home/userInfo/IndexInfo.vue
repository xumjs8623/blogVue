<template lang="html">
  <div class="index-info-sub">
    <div class="index-info-sub-content">
      <el-row>
        <!-- 头像 -->
        <el-col :span="24" class="avatar-content">
          <img src="@/../static/image/avatar.jpeg" alt="" class="avatar">
        </el-col>
        <!-- 名称 -->
        <el-col :span="24" class="avatar-word">
          <span class="username-word">MJ</span>
          <span class="sign-word">越努力！越幸福</span>
        </el-col>
        <!-- 统计 -->
        <el-col :span="24" class="info-count">
          <div class="info-count-sub">
            <span>1</span>
            <span>日志</span>
          </div>
          <div class="info-count-sub">
            <span>1</span>
            <span>分类</span>
          </div>
          <div class="info-count-sub">
            <span>1</span>
            <span>标签</span>
          </div>
        </el-col>
        <!-- 个人连接 -->
        <el-col :span="24" class="indexInfo-info">
          <el-row>
            <!-- github -->
            <el-col :span="8">
              <span>
                <i class="iconfont icon-github"></i>GitHub
              </span>
            </el-col>
            <!-- 微博 -->
            <el-col :span="8">
              <i class="iconfont icon-iconset0403"></i>个人微博
            </el-col>
            <!-- 个人主页 -->
            <el-col :span="8">
              <i class="iconfont icon-iconset0403"></i>个人主页
            </el-col>
          </el-row>
        </el-col>
        <!-- 友情链接 -->
        <el-col :span="24" class="links-all">
          <el-row>
            <el-col :span="24">
              <i class="iconfont icon-iconset0403"></i>友情链接
            </el-col>
            <el-col :span="8" class="links"><span>菜鸟教程</span></el-col>
            <el-col :span="8" class="links"><span>node社区</span></el-col>
            <el-col :span="8" class="links"><span>前端资源</span></el-col>
            <el-col :span="8" class="links"><span>google</span></el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
// 间距
$margin: 30px;
.index-info-sub {
  background-color: #262a30;
  width: 100%;
  height: 100vh;
  color: #999;
  text-align: center;
  .index-info-sub-content{
    margin-top: 30%;
    display: inline-block;
    .avatar-content {
      text-align: center;
      .avatar {
        height: 100px;
        border-radius: 20px;
      }
    }
    .avatar-word{
      margin-bottom: #{$margin};
      .username-word{
        color: #fff;
        display: block;
        font-size: 16px;
        font-weight: 400;
      }
    }
    .info-count{
      margin-bottom: #{$margin};
      .info-count-sub {
        cursor: pointer;
        width: 40px;
        display: inline-block;
        &:hover{
          color: #fff;
        }
        span{
          display: block;
        }
      }
    }
    .indexInfo-info, .links-all {
      padding: 0px 30px;
    }
    .indexInfo-info{
      font-size: 13px;
    }
    .links-all{
      margin-top: #{$margin};
      .links{
        span{
          cursor: pointer;
          padding-bottom: 4px;
          border-bottom: solid 1px #555;
          &:hover {
            color: #eee;
          }
        }
      }
    }
  }
}

</style>
