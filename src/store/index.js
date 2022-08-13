import { createStore, createLogger } from "vuex";
import { v4 as uuid } from "@lukeed/uuid";
import * as TaskService from "../services/TaskService";

const store = createStore({
  state() {
    return {
      tasks: null,
      areTaskLoading: false,
      currentTaskname: "",
      currentStartTime: null,
      isTaskInProgress: false,
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
    SET_CURRENT_TASKNAME(state, value) {
      state.currentTaskname = value;
    },
    SET_CURRENT_START_TIME(state, value) {
      state.currentStartTime = value;
    },
    SET_IS_TASK_IN_PROGRESS(state, bool) {
      state.isTaskInProgress = bool;
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

    startTask({ commit }) {
      commit("SET_IS_TASK_IN_PROGRESS", true);
      commit("SET_CURRENT_START_TIME", Date.now());
    },

    stopTask({ state, commit }) {
      // Enregistrement de la tâche
      const newTask = {
        id: uuid(),
        name: state.currentTaskname,
        startTime: state.currentStartTime,
        endTime: Date.now(),
      };
      commit("ADD_TASK", newTask);
      // end of taks
      commit("SET_IS_TASK_IN_PROGRESS", false);
      commit("SET_CURRENT_TASKNAME", "");
    },
    restartTask({ state, commit, dispatch }, newTaskname) {
      // stop current task
      if (state.isTaskInProgress) {
        dispatch("stopTask");
      }
      // start new task
      setTimeout(function () {
        commit("SET_CURRENT_TASKNAME", newTaskname);
        dispatch("startTask");
      });
    },
  },
  plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;
