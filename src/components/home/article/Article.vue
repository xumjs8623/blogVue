<template lang="html">
  <el-row>
    <el-col :span="24" class="article">
      <div class="article-item" v-for="item in articleData" :key="item.id">
        <div class="article-title">
          <span>{{item.title}}</span>
        </div>
        <div class="article-meta">
          <span><i class="iconfont icon-rili"></i>发表于 {{item.createTime}} |  <i class="iconfont icon-icon-test"></i>分类于 {{item.categoryName}}</span>
        </div>
        <div class="article-body">
            {{item.content}}
        </div>
        <div class="article-button">
          <span @click="readArticle(item.id)">阅读全文<i class="iconfont icon-jiantou1"></i></span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as api from '@/api'
export default {
  data () {
    return {
      articleData: []
    }
  },
  created () {
    this.articleList()
  },
  methods: {
    // 文章列表
    articleList () {
      api.homeArticleList()
        .then((data) => {
          if (data.code === 1) {
            this.articleData = data.data
          }
        })
    },
    // 阅读全文
    readArticle (id) {
      this.$router.push(`/article/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./article.scss";
</style>
