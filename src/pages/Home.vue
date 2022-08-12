<template>
  <div>
    <h1>Home {{ $store.state.count }}</h1>
    <TaskList
      :tasks="tasks"
      :areTaskLoading="areTaskLoading"
      v-on="{
        restart: sendRestart,
        delete: sendDelete,
      }"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TaskList from "../components/TaskList.vue";
export default {
  components: {
    TaskList,
  },
  emits: ["restart", "delete"],
  props: {
    areTaskLoading: {
      type: Boolean,
      default: false,
    },
    tasks: {
      type: Array,
      default: [],
    },
  },
  methods: {
    sendRestart(data) {
      this.$emit("restart", data);
    },
    sendDelete(data) {
      this.$emit("delete", data);
    },
    // ...mapMutations(["SET_COUNT", "INCREMENT_COUNT"]),
    ...mapActions({
      resetRenameCount: "resetCount",
    }),
  },
  async mounted() {
    // await this.$store.dispatch("resetCount");
    await this.resetRenameCount();
    console.log("action finished");
  },
};
</script>

<style lang="scss" scoped></style>
