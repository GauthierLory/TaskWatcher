import { createStore, createLogger } from "vuex";
import TasksModule from './module/tasks.js'
import NotificationsModule from './module/notifications.js'

const store = createStore({
  modules: {
    tasks: TasksModule,
    notifications: NotificationsModule
  },
  plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;
