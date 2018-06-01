<template lang="html">
  <el-row>
    <el-col :span="24" class="article-content-title">
      {{article.title}}
    </el-col>
    <el-col :span="24" class="article-content-meta">
      <span><i class="iconfont icon-rili"></i>发表于 {{article.createTime}} |  <i class="iconfont icon-icon-test"></i>分类于 {{article.categoryName}}</span>
    </el-col>
    <el-col :span="24" class="article-content-word" v-html="article.content">
    </el-col>
  </el-row>
</template>

<script>
import * as api from '@/api'
export default {
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.articleInfo()
  },
  methods: {
    articleInfo () {
      let id = this.$route.params.id
      if (id) {
        api.homeArticleInfo({id: id})
          .then(data => {
            if (data.code === 1) {
              this.article = data.data
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-content-title {
  font-size: 26px;
  font-weight: 400;
  text-align: center;
  margin-top: 60px;
}
.article-content-meta{
  color: #999;
  font-size: 12px;
  text-align: center;
  line-height: 2;
  .iconfont{
    margin-right: 3px;
    font-size: 12px;
  }
}
.article-content-word{
  margin-top: 40px;
}
</style>
