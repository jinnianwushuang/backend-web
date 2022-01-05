/*
 * @Date           : 2022-01-03 14:59:31
 * @FilePath       : /backend-web/src/router/routes.js
 * @Description    : 
 */

const routes = [
  {
    path: '/',
    name:'login',
    meta:{
      text:"登录页面"
    },
    component: () => import('src/pages/login/login.vue'),
   
  },
  {
    path: '/',
    name:'main',
    meta:{
      text:"主页面"
    },
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { 
        path: 'operatelog', 
        name:'operatelog', 
        meta:{
          text:"操作日志"
        },
      component: () => import('src/pages/operatelog/index.vue') 
    },
    { 
      path: 'exceptionLog', 
      name:'exceptionLog', 
      meta:{
        text:"异常日志"
      },
    component: () => import('src/pages/exceptionLog/index.vue') 
  },
  { 
    path: 'tgbusiness', 
    name:'tgbusiness', 
    meta:{
      text:'TG业务'
    },
  component: () => import('src/pages/tgbusiness/index.vue') 
},

{ 
  path: 'over-view', 
  name:'over-view', 
  meta:{
    text:'业务概览'
  },
component: () => import('src/pages/over-view/index.vue') 
},
{ 
  path: 'task', 
  name:'task', 
  meta:{
    text:'任务管理'
  },
component: () => import('src/pages/task/index.vue') 
}




 
    
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
