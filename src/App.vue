<template>
  <el-container>
    <el-aside width="220px">
      <TheMenu />
    </el-aside>

    <el-container>
      <el-header height="60px">
        <TheTopTask ref="TheTopTask" />
      </el-header>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheMenu from './components/TheMenu.vue'
import TheTopTask from './components/TheTopTask.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    TheMenu,
    TheTopTask
  },

  computed: {
    ...mapState({
      tasks: (state) => state.tasks.tasks
    })
  },

  watch: {
    tasks: {
      deep: true,
      async handler (newVal, oldVal) {
        if (newVal != null && oldVal != null) {
          try {
            await this.updateAllTasks()
          } catch (e) {
            console.error(e)
            this.sendError({
              title: 'Mode Hors-ligne',
              message: 'Synchronisation des taches impossible'
            })
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      fetchAllTasks: 'tasks/fetchAllTasks',
      updateAllTasks: 'tasks/updateAllTasks',
      sendError: 'notifications/sendError'
    }),

    ...mapMutations({
      SET_NOTIFIER: 'notifications/SET_NOTIFIER'
    })
  },

  async created () {
    // mise en place du systeme de notification
    this.SET_NOTIFIER(this.$notify)
    // Récupération de toutes les tâches
    try {
      await this.fetchAllTasks()
    } catch (e) {
      console.error(e)
      this.sendError({
        title: 'Mode hors-ligne',
        message: 'Récupération des tâches impossible'
      })
    }
  }
}
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
