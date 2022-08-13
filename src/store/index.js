import { createStore, createLogger } from "vuex";
import { v4 as uuid } from "@lukeed/uuid";
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
    ADD_TASK(state, newTask) {
      state.tasks.unshift(newTask);
    },
    DELETE_TASK(state, taskIndex) {
      state.tasks.splice(taskIndex, 1);
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
    addTask({ commit }, { name, startTime }) {
      console.log("name", name);
      const newTask = {
        id: uuid(),
        name,
        startTime,
        endTime: Date.now(),
      };
      console.log("newTask", newTask);
      commit("ADD_TASK", newTask);
    },
    deleteTask({ state, commit }, taskID) {
      let taskIndex = null;
      state.tasks.forEach((task, index) => {
        if (task.id === taskID) {
          taskIndex = index;
        }
      });
      // delete task local
      commit("DELETE_TASK", taskIndex);
    },
  },
  plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;
