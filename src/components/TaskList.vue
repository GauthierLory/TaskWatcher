<template>
  <el-select
    v-model="sortBy"
    class="m-2"
    placeholder="Ordre des taches"
  >
    <el-option
      label="la plus recente"
      value="descending"
    />
    <el-option
      label="la plus ancienne"
      value="ascending"
    />
  </el-select>

  <div
    v-for="dayTasks, dayTS in tasksByDay"
    :key="dayTS"
  >
    <h3>{{ fullDateFormatter.format(dayTS) }}</h3>
    <el-table
      :ref="dayTS"
      v-loading="areTasksLoading"
      :data="dayTasks"
      :row-class-name="checkHighlight"
      row-key="id"
      empty-text="Aucune tache"
      style="width: 100%"
      @row-click="setHighlight"
    >
      <el-table-column
        prop="name"
        sort-by="startTime"
        label="Tâche"
      />

      <el-table-column
        align="right"
        label="Début et fin"
        width="150"
      >
        <template #header />
        <template #default="scope">
          {{ formatTimeStamp(scope.row.startTime) }} -
          {{ formatTimeStamp(scope.row.endTime) }}
        </template>
      </el-table-column>

      <el-table-column
        align="right"
        label="Durée"
        width="100"
      >
        <template #header />
        <template #default="scope">
          {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
        </template>
      </el-table-column>

      <el-table-column
        align="right"
        label="Actions"
        width="380"
      >
        <template #header />
        <template #default="scope">
          <TaskListActions
            :task-i-d="scope.row.id"
            :taskname="scope.row.name"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TaskListActions from './TaskListActions.vue'
import TimeStampMixin from '../mixins/timestamp.js'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    TaskListActions
  },

  mixins: [TimeStampMixin],
  data () {
    return {
      defaultSortBy: 'descending',
      sortBy: this.$route.query.sortBy === 'ascending' ? 'ascending' : 'descending'
    }
  },

  computed: {
    ...mapState({
      areTasksLoading: (state) => state.tasks.areTasksLoading
    }),

    ...mapGetters({
      tasksByDay: 'tasks/tasksByDay'
    })
  },

  watch: {
    sortBy (newVal) {
      this.$router.push({ query: { sortBy: (newVal === this.defaultSortBy) ? undefined : newVal } })
      this.sortTable()
    },

    tasksByDay: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          this.sortTable()
        })
      }
    }
  },

  mounted () {
    this.sortTable()
  },

  methods: {
    formatTimeStamp (ts) {
      return this.tsFormatter.format(ts)
    },

    sortTable () {
      for (const dayTS in this.tasksByDay) {
        this.$refs[dayTS][0].sort('name', this.sortBy)
      }
    },

    checkHighlight ({ row }) {
      if (this.$route.params.taskID && row.id === this.$route.params.taskID) {
        return 'highlight-line'
      } else {
        return ''
      }
    },

    setHighlight (row) {
      this.$router.push({ path: '/' + row.id })
    }
  }
}
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
