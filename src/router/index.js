import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/avatar', //头像应用
    component: () => import('@/views/avatar/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/search'),
      meta: { title: '代码搜索', icon: 'table' }
    },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/dashboard/publish'),
        hidden: true,
        meta: { title: '发布NFT'}
      }]
  },
  {
    path: '/nft',
    component: Layout,
    redirect: '/nft',
    children: [{
      path: 'nft',
      name: 'nft',
      component: () => import('@/views/nft/index'),
      meta: { title: '代码迁移', icon: 'el-icon-coin' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '我的代码', icon: 'el-icon-star-on' }
    }]
  },

  // {
  //   path: '/toolbox',
  //   component: Layout,
  //   redirect: '/toolbox/sales-estimator',
  //   name: 'Toolbox',
  //   meta: { title: '工具箱', icon: 'table' },
  //   children: [
  //     {
  //       path: '/toolbox/sales-estimator',
  //       name: 'sales-estimator',
  //       component: () => import('@/views/toolbox/sales-estimator/index'),
  //       meta: { title: '销量预估', icon: 'el-icon-s-data' }
  //     },
  //     {
  //       path: '/toolbox/listing-grader',
  //       name: 'listing-grader',
  //       component: () => import('@/views/toolbox/listing-grader/index'),
  //       meta: { title: '商品页评级优化', icon: 'el-icon-star-on' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/selection',
  //   component: Layout,
  //   redirect: '/selection/database',
  //   name: 'Selection',
  //   meta: { title: '选品功能', icon: 'el-icon-shopping-bag-1' },
  //   children: [
  //     {
  //       path: '/selection/database',
  //       name: 'database',
  //       component: () => import('@/views/selection/database/index'),
  //       meta: { title: '选品数据库', icon: 'el-icon-coin' }
  //     },
  //     // {
  //     //   path: '/selection/tracker',
  //     //   name: 'tracker',
  //     //   component: () => import('@/views//selection/tracker/index'),
  //     //   meta: { title: '竞品跟踪器', icon: 'el-icon-position' }
  //     // },
  //     // {
  //     //   path: '/selection/opportunity',
  //     //   name: 'opportunity',
  //     //   component: () => import('@/views//selection/opportunity/index'),
  //     //   meta: { title: '潜力市场搜索器', icon: 'el-icon-medal' }
  //     // },
  //     {
  //       path: '/selection/category-trends',
  //       name: 'category-trends',
  //       component: () => import('@/views//selection/category-trends/index'),
  //       meta: { title: '类目趋势', icon: 'el-icon-s-marketing' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/supplier',
  //   component: Layout,
  //   redirect: '/supplier/database',
  //   name: 'Supplier',
  //   meta: { title: '供应商功能', icon: 'el-icon-s-shop' },
  //   children: [
  //     {
  //       path: '/supplier/database',
  //       name: 'sb_database',
  //       component: () => import('@/views/supplier/database/index'),
  //       meta: { title: '供应商数据库', icon: 'el-icon-coin' }
  //     },
  //     {
  //       path: '/supplier/union',
  //       name: 'union',
  //       component: () => import('@/views/supplier/union/index'),
  //       meta: { title: '可信供应链联盟', icon: 'el-icon-s-ticket' }
  //     },
  //     {
  //       path: '/supplier/user',
  //       name: 'user',
  //       component: () => import('@/views/supplier/user/index'),
  //       meta: { title: '我的商品', icon: 'el-icon-box' }
  //     },
  //     {
  //       path: '/supplier/detail',
  //       name: 'detail',
  //       component: () => import('@/views/supplier/detail/index'),
  //       hidden: true
  //     },
  //   ]
  // },
  //
  // {
  //   path: '/keyword',
  //   component: Layout,
  //   redirect: '/keyword/search',
  //   name: 'Keyword',
  //   meta: { title: '关键词功能', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: '/keyword/search',
  //       name: 'search',
  //       component: () => import('@/views/keyword/search/index'),
  //       meta: { title: '关键词搜索', icon: 'el-icon-chat-round' }
  //     },
  //     // {
  //     //   path: '/keyword/lists',
  //     //   name: 'lists',
  //     //   component: () => import('@/views/keyword/lists/index'),
  //     //   meta: { title: '我的关键词', icon: 'tree' }
  //     // },
  //     // {
  //     //   path: '/keyword/listings',
  //     //   name: 'listings',
  //     //   component: () => import('@/views/keyword/listings/index'),
  //     //   meta: { title: 'listing生成器', icon: 'el-icon-bank-card' }
  //     // },
  //     {
  //       path: '/keyword/rank',
  //       name: 'rank',
  //       component: () => import('@/views/keyword/rank/index'),
  //       meta: { title: '商品关键词', icon: 'el-icon-zoom-in' }
  //     }
  //   ]
  // },



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
