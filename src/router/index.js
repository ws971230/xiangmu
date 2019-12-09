import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login = () => import('@/view/login.vue')
const base = () => import('@/view/base.vue')
const fxorder = () => import('@/components/fenxi/order.vue')
const fxuser = () => import('@/components/fenxi/user.vue')

const kfpz=()=>import('@/components/kaifa/kfjbpz.vue')
const kfqx=()=>import('@/components/kaifa/kfjrqx.vue')
const kfadd=()=>import('../components/kaifa/add.vue')

// 角色
const jslist=()=>import('@/components/jslb/list.vue')
const jsadd=()=>import('@/components/jslb/add.vue')
const jsedit=()=>import('@/components/jslb/edit.vue')
// 管理员
const glylist=()=>import('@/components/gly/list.vue')
const glyadd=()=>import('@/components/gly/add.vue')
import axios from 'axios'
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/base',
      name: 'base',
      component: base,
      children: [
        {
          path: 'fxuser',
          name: 'fxuser',
          component: fxuser,
        },
        {
          path: 'fxorder',
          name: 'fxorder',
          component: fxorder,
        },
        {
          path: 'kfadd',
          name: 'kfadd',
          component: kfadd,
        },

       

        {
          path: 'kfpz',
          name: 'kfpz',
          component: kfpz,
        },
        {
          path: 'kfqx',
          name: 'kfqx',
          component: kfqx,
        },

        // 角色管理
        {
          path: 'jslist',
          name: 'jslist',
          component: jslist,
        },
        {
          path: 'jsadd',
          name: 'jsadd',
          component: jsadd,
        },
        {
          path: 'jsedit/:id',
          name: 'jsedit',
          component: jsedit,
        },

        
        {
          path: 'glylist',
          name: 'glylist',
          component: glylist,
        },
        {
          path: 'glyadd',
          name: 'glyadd',
          component: glyadd,
        }
      ]
    },
    {
      path: "/",
      redirect: "/login"
    }
  ]
})

//路由守卫全局的--路由发生改变时 ---验证token是否过期。或者存在
//验证失败回到登录页面。成功则进入对应路由页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('ht_token') ? JSON.parse(localStorage.ht_token).token : ''

  //排除登录页面to.name
  if (to.name != 'login') {

    axios.get('/checktoken', {
      headers: { token: token }
    }).then(res => {

      //res.data.err_code==400失败--跳转登录
      if (res.data.err_code == 200) {
        next()
      } else {
        router.push({ name: 'login' })
      }

    })
  } else {
    next()
  }

})

export default router