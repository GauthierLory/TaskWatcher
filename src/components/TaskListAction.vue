<template>
  <el-button @click="sendRestart"> Relancer </el-button>
  <el-button type="danger" @click="deleteTask(taskID)"> Supprimer </el-button>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    taskID: {
      type: String,
      required: true,
    },
  },
  emits: ["restart"],
  methods: {
    ...mapActions(["deleteTask"]),
    sendRestart() {
      this.$emit("restart", this.taskID);
    },
  },
};
</script>

<style lang="scss" scoped></style>
