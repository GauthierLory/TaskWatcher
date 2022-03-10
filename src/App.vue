<template>
  <el-container>
    <el-aside width="200px">
      <TheMenu/>
    </el-aside>

    <el-container>

      <el-header height="60px">
        <TheTopTask
            ref="TheTopTask"
            @newTask="addTask"
        />
      </el-header>

      <el-main>

<!--        <ul>-->
<!--          <li><router-link to="/">Home</router-link></li>-->
<!--          <li><router-link to="/settings">Settings</router-link></li>-->
<!--        </ul>-->
        <RouterView/>

        <TaskList
            :tasks="tasks"
            :areTaskLoading="areTaskLoading"
            v-on="{
              restart: sendRestartTask,
              delete: deleteTask
            }"
        />
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
import { v4 as uuid } from '@lukeed/uuid'
import * as TaskService from './services/TaskService'
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
import TaskList from "./components/TaskList.vue";

export default {
  components: {
    TaskList,
    TheMenu,
    TheTopTask
  },
  data() {
    return {
      tasks: [],
      areTaskLoading: true
    }
  },
  watch: {
    tasks: {
      deep: true,
      async handler(newVal, oldVal) {
        if (newVal != null && oldVal != null) {
          try {
            await TaskService.updateAll(this.tasks)
          } catch (e) {
            console.error(e)
            this.$notify({
              title: 'Mode Hors-ligne',
              message: `Synchronisation des taches impossible`,
              type: 'error',
              offset: 50,
              duration: 3000
            })
          }
        }
      }
    }
  },
  methods: {
    async addTask({ name, startTime }) {
      // add task local
      this.tasks.unshift({
        id: uuid(),
        name,
        startTime,
        endTime: Date.now()
      })
      // add task to api
      try {
        await TaskService.updateAll(this.tasks)
      } catch (e) {
        console.error(e)
      }
    },
    sendRestartTask (taskID) {
      // get old name task
      let newTaskname = null
      this.tasks.forEach(task => {
        if ( task.id === taskID) {
          newTaskname = task.name
        }
      })
      // restart task
      this.$refs.TheTopTask.restartTask(newTaskname)
    },
    async deleteTask (taskId) {
      let taskIndex = null
      this.tasks.forEach((task, index) => {
        if ( task.id === taskId) {
          taskIndex = index
        }
      })
      // delete task local
      this.tasks.splice(taskIndex, 1)

      // add task to api
      try {
        await TaskService.updateAll(this.tasks)
      } catch (e) {
        console.error(e)
      }
    },
  },
  async created() {
    console.log(import.meta.env)
    try {
      this.tasks = await TaskService.getAll()
      console.log(this.tasks)
    } catch (e) {
      console.error(e)
      this.tasks = []
      this.$notify({
        title: 'Mode Hors-ligne',
        message: `Recuperation des taches impossible`,
        type: 'error',
        offset: 50,
        duration: 3000
      })
    }
    this.areTaskLoading = false
  }
}
</script>

<style lang="scss">
body {
  margin: 0
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
    border: none !important
  }
  border-bottom: solid 1px #e6e6e6;
}

</style>