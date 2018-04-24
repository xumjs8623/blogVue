import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/admin/Login'
import Admin from '@/components/common/Admin'
import User from '@/components/admin/User'
import IndexPage from '@/components/admin/Index'
import Article from '@/components/admin/article/Article'
import ArticleContent from '@/components/admin/article/ArticleContent'
import Tag from '@/components/admin/Tag'
import Category from '@/components/admin/Category'
import SystemParams from '@/components/admin/SystemParams'
Vue.use(Router)
export default new Router({
  routes: [
    {
      // 登录页
      path: '/login',
      component: Login
    }, {
      path: '/admin/',
      component: Admin,
      children: [
        {
          path: '',
          component: IndexPage
        },
        {
          path: 'user',
          component: User
        },
        {
          path: 'category',
          component: Category
        },
        {
          path: 'tag',
          component: Tag
        },
        {
          path: 'article',
          component: Article
        },
        {
          path: 'articleContent',
          component: ArticleContent
        },
        {
          path: 'systemParams',
          component: SystemParams
        }
      ]
    }
  ]
})
