<template>
  <div>
    <h1>Home {{ $store.state.count }}</h1>
    <TaskList
      v-on="{
        restart: sendRestart,
        delete: sendDelete,
      }"
    />
  </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";
export default {
  components: {
    TaskList,
  },
  emits: ["restart", "delete"],
  methods: {
    sendRestart(data) {
      this.$emit("restart", data);
    },
    sendDelete(data) {
      this.$emit("delete", data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
