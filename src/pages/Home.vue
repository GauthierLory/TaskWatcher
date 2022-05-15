<template>
  <div>
    <h1>Home</h1>
    <TaskList
        :tasks="tasks"
        :areTaskLoading="areTaskLoading"
        v-on="{
              restart: sendRestart,
              delete: sendDelete
            }"
    />
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
export default {
  components: {
    TaskList
  },
  emits: ['restart', 'delete'],
  props: {
    areTaskLoading: {
      type: Boolean,
      default: false
    },
    tasks: {
      type: Array,
      default: []
    }
  },
  methods: {
    sendRestart (data) {
      this.$emit('restart', data)
    },
    sendDelete (data) {
      this.$emit('delete', data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>