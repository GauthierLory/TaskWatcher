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

      <el-table-column align="right" label="Actions" width="350">
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
import TimeStampMixin from '../mixins/timestamp.js'
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TaskListActions,
  },
  mixins: [TimeStampMixin],
  data() {
    return {
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
    },
  },
    formatTimeStamp(ts) {
      return this.tsFormatter.format(ts);
    },
    sortTable() {
      for (let dayTS in this.tasksByDay) {
        this.$refs[dayTS][0].sort('name', this.sortBy)
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
      this.$router.push({ path: '/' + row.id })
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
