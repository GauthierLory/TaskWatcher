import * as VueRouter from 'vue-router'
import HomePage from '../pages/Home.vue'

const NotFoundPage = () => import('../pages/NotFound.vue')
const SettingsPage = () => import('../pages/Settings.vue')
const SettingsApp = () => import('../components/SettingsApp.vue')
const SettingsUser = () => import('../components/SettingsUser.vue')

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: HomePage,
      meta: { needJsonBin: true },
      children: [
        {
          path: ':taskID',
          component: HomePage
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage,
      meta: { needJsonBin: true },
      children: [
        {
          path: 'user',
          component: SettingsUser,
          meta: { needJsonBin: true }
        },
        {
          path: 'app',
          component: SettingsApp,
          meta: { needJsonBin: false }
        }
      ]
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFoundPage
    },
    {
      path: '/:wrongPath(.*)',
      redirect: (to) => {
        return { name: 'NotFound', params: { wrongPath: to.params.wrongPath } }
      }
    }
  ]
})

router.beforeEach((to, from) => {
  // if (to.meta.needLoggedIn && !localStorage.getItem("isLoggedIn")) {
  if (to.meta.needJsonBin && !localStorage.getItem('jsonBinAccess')) {
    return '/settings/app'
  }
})

export default router
