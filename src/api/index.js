import axios from 'axios'
import router from '../router'
import url from '../../config/url'
// 自动将响应头中的token 放到请求头中去请求
axios.defaults.baseURL = url
axios.defaults.withCredentials = true
// axios 响应拦截器
axios.interceptors.response.use(
  res => {
    // 状态码为-1 跳转到登录页
    if (res.data.code === -1) {
      router.push('/login')
      // 添加data格式，方便判断
    }
    // 状态码为-1 跳转到登录页
    if (res.data.code === -2) {
      router.push('/login')
      // 添加data格式，方便判断
    }
    return res
  },
  error => {
    if (error) {
      error.res.data['code'] = '-1'
      error.res.data['data'] = []
    }
    return Promise.reject(error.res.data) // 返回接口返回的错误信息
  })
/* -------------------------用户管理模块----------------------------- */
export const login = params => { return axios.post('/login', params).then(res => res.data).catch((error) => { console.log(error) }) }
export const logout = params => { return axios.get('/logout', { params: params }).then(res => res.data).catch((error) => { console.log(error) }) }
/* -------------------------用户管理模块----------------------------- */
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
