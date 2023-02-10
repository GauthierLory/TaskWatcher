<template>
  <el-select v-model="sortBy" class="m-2" placeholder="Ordre des taches">
    <el-option label="la plus recente" value="descending" />
    <el-option label="la plus ancienne" value="ascending" />
  </el-select>


  <div v-for="dayTasks, dayTS in tasksByDay" :key="dayTS">
    <h3>{{ fullDateFormatter.format(dayTS) }}</h3>
    <el-table :data="dayTasks" :row-class-name="checkHighlight" @row-click="setHighlight" row-key="id"
      empty-text="Aucune tache" v-loading="areTasksLoading" :ref="dayTS" style="width: 100%">
      <el-table-column prop="name" sort-by="startTime" label="Tâche">
      </el-table-column>

      <el-table-column align="right" label="Début et fin" width="150">
        <template #header></template>
        <template #default="scope">
          {{ formatTimeStamp(scope.row.startTime) }} -
          {{ formatTimeStamp(scope.row.endTime) }}
        </template>
      </el-table-column>

      <el-table-column align="right" label="Durée" width="100">
        <template #header></template>
        <template #default="scope">
          {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
        </template>
      </el-table-column>

      <el-table-column align="right" label="Actions" width="200">
        <template #header></template>
        <template #default="scope">
          <TaskListActions :taskID="scope.row.id" :taskname="scope.row.name" />
        </template>
      </el-table-column>
    </el-table>
  </div>


</template>

<script>
import TaskListActions from "./TaskListActions.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TaskListActions,
  },
  data() {
    return {
      tsFormatter: Intl.DateTimeFormat("fr", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDateFormatter: Intl.DateTimeFormat('fr', { dateStyle: 'full' }),
      defaultSortBy: 'descending',
      sortBy: this.$route.query.sortBy === "ascending" ? "ascending" : "descending"
    };
  },

  computed: {
    ...mapState({
      areTasksLoading: (state) => state.tasks.areTasksLoading,
    }),
    ...mapGetters({
      tasksByDay: 'tasks/tasksByDay'
    })
  },
  watch: {
    sortBy(newVal) {
      this.$router.push({ query: { sortBy: (newVal === this.defaultSortBy) ? undefined : newVal } })
      this.sortTable()
    },
    tasksByDay: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.sortTable()
        })
      },
  methods: {
    formatTimeStamp(ts) {
      return this.tsFormatter.format(ts);
    },
    durationBetweenTimestamps(start, end) {
      let seconds = Math.floor(end / 1000 - start / 1000);
      let minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      seconds = seconds % 60;
      minutes = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
  },
  methods: {
    sortTable() {
      // this.$refs.table.sort("name", this.sortBy);
      // console.log('this.tasksByDay', this.tasksByDay)
      for (let dayTS in this.tasksByDay) {
        this.$refs[dayTS][0].sort('name', this.sortBy)
        this.$refs.table.sort("name", this.sortBy);
        // this.$refs[dayTS].sort('name', this.sortBy)
      }
    },
    checkHighlight({ row }) {
      if (this.$route.params.taskID && row.id === this.$route.params.taskID) {
        return 'highlight-line'
      } else {
        return ''
      }
    },
    setHighlight(row) {
      // this.$router.push({ params: {taskID: row.id}})
      this.$router.push({ path: '/' + row.id })
      // console.log("this.$route sss", this.$route)
    }
  },
  mounted() {
    this.sortTable();
  },
};
</script>

<style scoped>
.el-select {
  float: right;
}

h3 {
  text-align: left;
  text-transform: capitalize;
}
</style>
