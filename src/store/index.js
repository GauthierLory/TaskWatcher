import { createStore, createLogger } from "vuex";
import TasksModule from './module/tasks.js'

const store = createStore({
  modules: {
    tasks: TasksModule
  },
  plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;
