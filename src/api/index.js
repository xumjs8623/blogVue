import axios from 'axios'
import router from '../router'
import url from '../../config/url'
import {Message} from 'element-ui'
// 自动将响应头中的token 放到请求头中去请求
console.log('url:' + url)
axios.defaults.baseURL = url
axios.defaults.withCredentials = true
// axios 响应拦截器
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  console.log(res)
  if (res.data.code === -1) {
    router.push('/login')
  }
  if (res.data.code === 0) {
    Message.error(res.data.msg)
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
/* -------------------------前台----------------------------- */
// 文章列表
export const homeArticleList = params => { return axios.get('/home/article', {params: params}).then(res => res.data).catch((error) => { console.log(error) }) }
// 文章详情
export const homeArticleInfo = params => { return axios.get('/home/article/' + params.id).then(res => res.data).catch((error) => { console.log(error) }) }
// 分类列表
export const homeCategoryList = params => { return axios.get('/home/category', {params: params}).then(res => res.data).catch((error) => { console.log(error) }) }
// 标签列表
export const homeTagList = params => { return axios.get('/home/tag', {params: params}).then(res => res.data).catch((error) => { console.log(error) }) }
/* -------------------------后台----------------------------- */
// 系统
export const login = params => { return axios.post('/login', params).then(res => res.data).catch((error) => { console.log(error) }) }
export const logout = params => { return axios.get('/logout', { params: params }).then(res => res.data).catch((error) => { console.log(error) }) }
// 用户管理
export const userList = params => { return axios.get('/admin/user', { params: params }).then(res => res.data).catch((error) => { console.log(error) }) }
export const userShow = params => { return axios.get('/admin/user/' + params.id).then(res => res.data).catch((error) => { console.log(error) }) }
export const userInsert = params => { return axios.post('/admin/user', params).then(res => res.data).catch((error) => { console.log(error) }) }
export const userDelt = params => { return axios.delete('/admin/user/' + params.id, { headers: { 'Content-Type': 'application/json' }, data: {} }).then(res => res.data).catch((error) => { console.log(error) }) }
export const userUpdate = params => { return axios.put('/admin/user/' + params.id, params).then(res => res.data).catch((error) => { console.log(error) }) }
// 分类管理
export const categoryList = params => { return axios.get('/admin/category', { params: params }).then(res => res.data).catch((error) => { console.log(error) }) }
export const categoryShow = params => { return axios.get('/admin/category/' + params.id).then(res => res.data).catch((error) => { console.log(error) }) }
export const categoryInsert = params => { return axios.post('/admin/category', params).then(res => res.data).catch((error) => { console.log(error) }) }
export const categoryDelt = params => { return axios.delete('/admin/category/' + params.id, { headers: { 'Content-Type': 'application/json' }, data: {} }).then(res => res.data).catch((error) => { console.log(error) }) }
export const categoryUpdate = params => { return axios.put('/admin/category/' + params.id, params).then(res => res.data).catch((error) => { console.log(error) }) }
// 标签管理
export const tagList = params => { return axios.get('/admin/tag', { params: params }).then(res => res.data).catch((error) => { console.log(error) }) }
export const tagShow = params => { return axios.get('/admin/tag/' + params.id).then(res => res.data).catch((error) => { console.log(error) }) }
export const tagInsert = params => { return axios.post('/admin/tag', params).then(res => res.data).catch((error) => { console.log(error) }) }
export const tagDelt = params => { return axios.delete('/admin/tag/' + params.id, { headers: { 'Content-Type': 'application/json' }, data: {} }).then(res => res.data).catch((error) => { console.log(error) }) }
export const tagUpdate = params => { return axios.put('/admin/tag/' + params.id, params).then(res => res.data).catch((error) => { console.log(error) }) }
// 文章管理
export const articleList = params => { return axios.get('/admin/article', { params: params }).then(res => res.data).catch((error) => { console.log(error) }) }
export const articleShow = params => { return axios.get('/admin/article/' + params.id).then(res => res.data).catch((error) => { console.log(error) }) }
export const articleInsert = params => { return axios.post('/admin/article', params).then(res => res.data).catch((error) => { console.log(error) }) }
export const articleDelt = params => { return axios.delete('/admin/article/' + params.id, { headers: { 'Content-Type': 'application/json' }, data: {} }).then(res => res.data).catch((error) => { console.log(error) }) }
export const articleUpdate = params => { return axios.put('/admin/article/' + params.id, params).then(res => res.data).catch((error) => { console.log(error) }) }
