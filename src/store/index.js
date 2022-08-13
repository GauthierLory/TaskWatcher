import { createStore, createLogger } from "vuex";
import * as TaskService from "../services/TaskService";

const store = createStore({
  state() {
    return {
      tasks: null,
      areTaskLoading: false,
    };
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_ARE_TASKS_LOADING(state, bool) {
      state.areTaskLoading = bool;
    },
  },
  actions: {
    async fetchAllTasks({ commit }) {
      commit("SET_ARE_TASKS_LOADING", true);
      try {
        const allTasks = await TaskService.getAll();
        commit("SET_TASKS", allTasks);
        commit("SET_ARE_TASKS_LOADING", false);
      } catch (e) {
        commit("SET_ARE_TASKS_LOADING", false);
        throw e;
      }
    },
    async updateAllTasks({ state }) {
      await TaskService.updateAll(state.tasks);
    },
  },
  plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;
