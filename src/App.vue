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
        <TaskList
            :tasks="tasks"
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
      tasks: []
    }
  },
  methods: {
    addTask({ name, startTime }) {
      this.tasks.unshift({
        id: uuid(),
        name,
        startTime,
        endTime: Date.now()
      })
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
    deleteTask (taskId) {
      let taskIndex = null
      this.tasks.forEach((task, index) => {
        if ( task.id === taskId) {
          taskIndex = index
        }
      })
      this.tasks.splice(taskIndex, 1)
      console.log('delete task', taskId, taskIndex)
    },
  },
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