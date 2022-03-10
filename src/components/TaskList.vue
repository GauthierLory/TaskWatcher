<template>
  <el-table
      :data="tasks"
      row-key="id"
      empty-text="Aucune tache"
      stripe
      style="width: 100%">

    <el-table-column
        prop="name"
        label="Tâche">
    </el-table-column>

    <el-table-column
        align="right"
        label="Début et fin"
        width="150">
      <template #header></template>
      <template #default="scope">
        {{ formatTimeStamp(scope.row.startTime) }} - {{ formatTimeStamp(scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column
        align="right"
        label="Durée"
        width="100">
      <template #header></template>
      <template #default="scope">
        {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column
        align="right"
        label="Actions"
        width="@00">
      <template #header></template>
      <template #default="scope">
        <TaskListAction
            :taskID="scope.row.id"
            v-on="{
              restart: sendRestart,
              delete: sendDelete
            }"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import TaskListAction from "./TaskListAction.vue";
export default {
  components: {
    TaskListAction
  },
  data() {
    return {
      tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit'}),
    }
  },
  props: {
    tasks: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    formatTimeStamp (ts) {
      return this.tsFormatter.format(ts)
    },
    durationBetweenTimestamps (start, end) {
      let seconds = Math.floor((end / 1000) - (start / 1000))
      let minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      seconds = seconds % 60
      minutes = minutes % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    },
    sendRestart (data) {
      this.$emit('restart', data)
    },
    sendDelete (data) {
      this.$emit('delete', data)
    }
  },
}
</script>