<template>
  <el-container>
    <el-aside width="200px">
      <TheMenu />
    </el-aside>

    <el-container>
      <el-header height="60px">
        <TheTopTask ref="TheTopTask" @newTask="addTask" />
      </el-header>

      <el-main>
        <!--        <ul>-->
        <!--          <li><router-link to="/">Home</router-link></li>-->
        <!--          <li><router-link to="/settings">Settings</router-link></li>-->
        <!--        </ul>-->
        <RouterView
          v-on="{
            restart: sendRestartTask,
            delete: deleteTask,
          }"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { v4 as uuid } from "@lukeed/uuid";
import TheMenu from "./components/TheMenu.vue";
import TheTopTask from "./components/TheTopTask.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    TheMenu,
    TheTopTask,
  },
  watch: {
    tasks: {
      deep: true,
      async handler(newVal, oldVal) {
        if (newVal != null && oldVal != null) {
          try {
            await this.updateAllTasks();
          } catch (e) {
            console.error(e);
            this.$notify({
              title: "Mode Hors-ligne",
              message: `Synchronisation des taches impossible`,
              type: "error",
              offset: 50,
              duration: 3000,
            });
          }
        }
      },
    },
  },
  methods: {
    ...mapActions(["fetchAllTasks", "updateAllTasks"]),
    async addTask({ name, startTime }) {
      // add task local
      this.tasks.unshift({
        id: uuid(),
        name,
        startTime,
        endTime: Date.now(),
      });
      console.log("this.tasks[0].id", this.tasks[0].id);
    },
    sendRestartTask(taskID) {
      // get old name task
      let newTaskname = null;
      this.tasks.forEach((task) => {
        if (task.id === taskID) {
          newTaskname = task.name;
        }
      });
      // restart task
      this.$refs.TheTopTask.restartTask(newTaskname);
    },
    async deleteTask(taskId) {
      let taskIndex = null;
      this.tasks.forEach((task, index) => {
        if (task.id === taskId) {
          taskIndex = index;
        }
      });
      // delete task local
      this.tasks.splice(taskIndex, 1);
    },
  },
  computed: {
    ...mapState(["tasks", "areTasksLoading"]),
  },
  async created() {
    // Récupération de toutes les tâches
    try {
      await this.fetchAllTasks();
    } catch (e) {
      console.error(e);
      this.$notify({
        title: "Mode hors-ligne",
        message: `Récupération des tâches impossible`,
        type: "error",
        offset: 50,
        duration: 3000,
      });
    }
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-aside {
  color: #333;
  border-right: solid 1px #e6e6e6;
}
.el-header {
  color: #333;
  line-height: 60px;
  padding: 0 !important;
  .el-input .el-input__inner {
    border: none !important;
  }
  border-bottom: solid 1px #e6e6e6;
}

.highlight-line {
  background-color: #40a0ff31 !important;
}
</style>
