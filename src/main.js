import { createApp } from "vue";
import * as VueRouter from "vue-router";

import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import SettingsPage from "./pages/Settings.vue";
import NotFoundPage from "./pages/NotFound.vue";
import SettingsApp from "./components/SettingsApp.vue";
import SettingsUser from "./components/SettingsUser.vue";

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
      //   children: [
      //     {
      //       path: ":taskID",
      //       component: HomePage,
      //     },
      //   ],
    },
    {
      path: "/settings",
      name: "Settings",
      component: SettingsPage,
      children: [
        {
          path: "user",
          component: SettingsUser,
        },
        {
          path: "app",
          component: SettingsApp,
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
  ],
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");
