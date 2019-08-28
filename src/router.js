import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Login from './views/login.vue'
import Main from './components/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '*', component: () => import('./views/404.vue') },
    {
      path: '/',
      name: 'login',
      component: Login

    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '', component: Main },
        { path: '/index/comment',
          component: () => import('./views/common/index-list.vue')

        },
        { path: '/index/material',
          component: () => import('./views/material/index.vue')
        },
        { path: '/index/articles',
          component: () => import('./views/common/articles.vue')
        },
        { path: '/index/publish',
          component: () => import('./views/publish')
        },
        //  编辑文章 后面绑定动态路由
        { path: '/index/publish/:articleId',
          component: () => import('./views/publish')
        },
        { path: '/index/fansData',
          component: () => import('./views/pieCharts')
        },
        { path: '/index/account',
          component: () => import('./views/acount')
        }

      ]

    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
