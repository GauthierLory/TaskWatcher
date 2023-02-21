<template>
  <el-row>
    <el-col
      :xs="12"
      :span="15"
      :lg="18"
    >
      <el-input
        v-model="taskname"
        placeholder="Task name"
        @keyup.enter="toggleTask"
      />
    </el-col>
    <el-col
      :xs="12"
      :span="9"
      :lg="6"
      class="actions"
    >
      <el-button
        v-if="!isTaskInProgress"
        icon="VideoPlay"
        circle
        type="primary"
        @click="beforeStartTask"
      />
      <el-button
        v-else
        type="danger"
        icon="VideoPause"
        circle
        @click="beforeStopTask"
      />
      <span>{{ currentDuration }}</span>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TimeStampMixin from '../mixins/timestamp.js'
export default {
  mixins: [TimeStampMixin],
  data () {
    return {
      nowTime: null,
      intervalEverySecond: null,
      errorMsg: null
    }
  },

  computed: {
    ...mapState({
      startTime: (state) => state.tasks.currentStartTime,
      isTaskInProgress: (state) => state.tasks.isTaskInProgress
    }),

    taskname: {
      get () {
        return this.$store.state.tasks.currentTaskname
      },

      set (value) {
        this.$store.commit('tasks/SET_CURRENT_TASKNAME', value)
      }
    },

    currentDuration () {
      if (this.startTime && this.nowTime) {
        return this.durationBetweenTimestamps(this.startTime, this.nowTime)
      } else {
        return '00:00:00'
      }
    }
  },

  watch: {
    isTaskInProgress (isInProgress) {
      if (isInProgress) {
        this.nowTime = Date.now()
        this.intervalEverySecond = setInterval(() => {
          this.nowTime = Date.now()
        }, 1000)
      } else {
        this.errorMsg = null
        this.nowTime = null
        clearInterval(this.intervalEverySecond)
      }
    },

    errorMsg (newVal) {
      if (newVal != null) {
        this.sendWarning({
          title: 'Attention',
          message: this.errorMsg
        })
        this.errorMsg = null
      }
    }
  },

  methods: {
    // ...mapActions(["startTask", "stopTask"]),
    ...mapActions({
      startTask: 'tasks/startTask',
      stopTask: 'tasks/stopTask',
      sendWarning: 'notifications/sendWarning'
    }),

    beforeStartTask () {
      // check
      if (this.taskname.length === 0) {
        this.errorMsg = "Le nom d'une tache ne peut pas etre vide"
        return
      } else if (this.isTaskInProgress) {
        this.errorMsg = 'Une tache est deja en cours'
        return
      } else {
        this.errorMsg = null
      }
      // start task
      this.startTask()
    },

    beforeStopTask () {
      // check
      if (!this.isTaskInProgress) {
        this.errorMsg = "Aucune tache n'est en cours"
        return
      }

      // send the new task
      this.stopTask()
    },

    toggleTask () {
      if (this.isTaskInProgress) {
        this.beforeStopTask()
      } else {
        this.beforeStartTask()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  padding-left: 20px;
  box-sizing: border-box;
}

.actions {
  text-align: left;
  padding-left: 20px;

  span {
    padding-left: 20px;
  }
}
</style>
