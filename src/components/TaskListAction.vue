<template>
  <el-button
  @click="sendRestart">
    Relancer
  </el-button>
  <el-button
      type="danger"
      @click="sendDelete">
    Supprimer
  </el-button>
</template>

<script>
export default {
  props: {
    taskID: {
      type: String,
      required: true
    },
  },
  emits: ['restart', 'delete'],
  methods: {
    sendRestart () {
      this.$emit('restart', this.taskID)
    },
    sendDelete () {
      this.$emit('delete', this.taskID)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>