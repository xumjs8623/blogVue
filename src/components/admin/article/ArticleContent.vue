<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-input v-model="ruleForm.id" type="hidden" placeholder=""></el-input>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleForm.desc" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-cascader
            :options="dicData.category"
            v-model="categorySelect"
            :props="{label: 'name', value: 'id', children: 'children'}">
          </el-cascader>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="ruleForm.tags" multiple placeholder="请选择标签" allow-create>
            <el-option
              v-for="item in dicData.tag"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button type="text">新增标签</el-button>
        </el-form-item>
        <el-form-item label="内容">
          <markdown :initValue="ruleForm.content" :getValue="getMarkdownValue"></markdown>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import * as api from '@/api'
export default {
  components: {
    markdown: () => import('../../common/markdown')
  },
  data () {
    return {
      dicData: {
        category: [],
        tag: []
      },
      articleId: this.$route.params.id,
      categorySelect: [],
      ruleForm: {
        id: '',
        title: '',
        desc: '',
        content: '',
        categoryId: '',
        tags: []
      },
      rules: {
        title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
        categoryId: [{required: true, message: '请选择所属分类', trigger: 'blur'}]
      }
    }
  },
  watch: {
    categorySelect: function (value) {
      if (value.length !== 0) {
        this.ruleForm.categoryId = value[value.length - 1]
      } else {
        this.ruleForm.categoryId = ''
      }
    }
  },
  created () {
    this.categoryList()
    this.tagList()
    this.getArticleInfo()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (String(this.ruleForm.id) === '0') {
            api.articleInsert(this.ruleForm)
              .then(data => {
                if (data.code) {
                  this.$message({
                    message: data.msg,
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$router.push({path: '/admin/article'})
                    }
                  })
                }
              })
          } else {
            api.articleUpdate(this.ruleForm)
              .then(data => {
                if (data.code) {
                  this.$message({
                    message: data.msg,
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$router.push({path: '/admin/article'})
                    }
                  })
                }
              })
          }
        }
      })
    },
    // 获取富文本中的内容
    getMarkdownValue (value) {
      this.ruleForm.content = value
      console.log(value)
    },
    // 分类获取
    categoryList () {
      api.categoryList()
        .then(data => {
          console.log(data)
          if (data.code) {
            this.dicData.category = data.data.treeData
          }
        })
    },
    // 标签获取
    tagList () {
      api.tagList({
        page: 1,
        limit: 1000
      })
        .then(data => {
          console.log(data)
          if (data.code) {
            this.dicData.tag = data.data
          }
        })
    },
    // 获取文章详情
    getArticleInfo () {
      if (String(this.$route.params.id) !== '0') {
        api.articleShow({id: this.$route.params.id})
          .then((data) => {
            console.log(data)
            for (let x in this.ruleForm) {
              if (data.data.hasOwnProperty(x) && x !== 'tags') {
                this.ruleForm[x] = data.data[x]
              }
            }
            // 单独设置标签
            this.ruleForm.tags = []
            if (data.data.hasOwnProperty('tagIds')) {
              let tagIds = data.data.tagIds ? data.data.tagIds.split(',') : []
              for (let x in tagIds) {
                this.ruleForm.tags.push(Number(tagIds[x]))
              }
            }
            // 单独设置分类
            this.categorySelect = []
            if (data.data.hasOwnProperty('categoryArr') && data.data.categoryArr.length !== 0) {
              this.categorySelect = data.data.categoryArr
            }
          })
      }
    }
  }
}
</script>

<style lang="css">
</style>
