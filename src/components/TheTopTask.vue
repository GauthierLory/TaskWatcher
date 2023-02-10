<template>
  <el-row>
    <el-col :xs="12" :span="15" :lg="18">
      <el-input @keyup.enter="toggleTask" v-model="taskname" placeholder="Task name" />
    </el-col>
    <el-col :xs="12" :span="9" :lg="6" class="actions">
      <el-button v-if="!isTaskInProgress" @click="beforeStartTask" type="primary" circle size="small">
        <el-icon>
          <svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
            data-v-042ca774="">
            <path fill="currentColor"
              d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656l249.472 166.336a48 48 0 010 79.872L474.624 718.272A48 48 0 01400 678.336V345.6a48 48 0 0174.624-39.936z">
            </path>
          </svg>
        </el-icon>
      </el-button>
      <el-button v-else @click="beforeStopTask" type="danger" round size="small">
        <el-icon>
          <svg class="icon" width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
            data-v-042ca774="">
            <path fill="currentColor"
              d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z">
            </path>
          </svg>
        </el-icon>
      </el-button>
      <span>{{ currentDuration }}</span>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TimeStampMixin from '../mixins/timestamp.js'
export default {
  mixins: [TimeStampMixin],
  data() {
    return {
      nowTime: null,
      intervalEverySecond: null,
      errorMsg: null,
    };
  },
  computed: {
    ...mapState({
      startTime: (state) => state.tasks.currentStartTime,
      isTaskInProgress: (state) => state.tasks.isTaskInProgress,
    }),
    taskname: {
      get() {
        return this.$store.state.tasks.currentTaskname;
      },
      set(value) {
        this.$store.commit("tasks/SET_CURRENT_TASKNAME", value);
      },
    },
    currentDuration() {
      if (this.startTime && this.nowTime) {
        return this.durationBetweenTimestamps(this.startTime, this.nowTime);
      } else {
        return "00:00:00";
      }
    },
  },
  watch: {
    isTaskInProgress(isInProgress) {
      if (isInProgress) {
        this.nowTime = Date.now();
        this.intervalEverySecond = setInterval(() => {
          this.nowTime = Date.now();
        }, 1000);
      } else {
        this.errorMsg = null;
        this.nowTime = null;
        clearInterval(this.intervalEverySecond);
      }
    },
    errorMsg(newVal) {
      if (newVal != null) {
        this.sendWarning({
          title: "Attention",
          message: this.errorMsg,
        })
        this.errorMsg = null
      }
    },
  },
  methods: {
    // ...mapActions(["startTask", "stopTask"]),
    ...mapActions({
      startTask: 'tasks/startTask',
      stopTask: 'tasks/stopTask',
      sendWarning: 'notifications/sendWarning'
    }),
    beforeStartTask() {
      // check
      if (this.taskname.length === 0) {
        this.errorMsg = "Le nom d'une tache ne peut pas etre vide";
        return;
      } else if (this.isTaskInProgress) {
        this.errorMsg = "Une tache est deja en cours";
        return;
      } else {
        this.errorMsg = null;
      }
      // start task
      this.startTask();
    },
    beforeStopTask() {
      // check
      if (!this.isTaskInProgress) {
        this.errorMsg = "Aucune tache n'est en cours";
        return;
      }

      // send the new task
      this.stopTask();
    },
    toggleTask() {
      if (this.isTaskInProgress) {
        this.beforeStopTask();
      } else {
        this.beforeStartTask();
      }
    },
  },
};
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
