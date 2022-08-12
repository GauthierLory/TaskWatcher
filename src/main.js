import { createApp } from "vue";
import * as VueRouter from "vue-router";

import App from "./App.vue";
import HomePage from "./pages/Home.vue";

const LoginPage = () => import("./pages/Login.vue");
const NotFoundPage = () => import("./pages/NotFound.vue");
const SettingsPage = () => import("./pages/Settings.vue");
const SettingsApp = () => import("./components/SettingsApp.vue");
const SettingsUser = () => import("./components/SettingsUser.vue");

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "Home",
      component: HomePage,
      meta: { needJsonBin: false },
      children: [
        {
          path: ":taskID",
          component: HomePage,
        },
      ],
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsPage,
      meta: { needJsonBin: false },
      children: [
        {
          path: "user",
          component: SettingsUser,
          meta: { needJsonBin: false },
        },
        {
          path: "app",
          component: SettingsApp,
          meta: { needJsonBin: false },
        },
      ],
    },
    {
      path: "/notfound",
      name: "NotFound",
      component: NotFoundPage,
    },
    {
      path: "/:wrongPath(.*)",
      redirect: (to) => {
        return { name: "NotFound", params: { wrongPath: to.params.wrongPath } };
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem("isLoggedIn")) {
          return "/";
        }
      },
    },
  ],
});

router.beforeEach((to, from) => {
  // if (to.meta.needLoggedIn && !localStorage.getItem("isLoggedIn")) {
  if (to.meta.needJsonBin && !localStorage.getItem("jsonBinAccess")) {
    // return "/login";
    return "/settings/app";
  }
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
