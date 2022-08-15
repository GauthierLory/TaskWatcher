<template>
  <el-button @click="copyToClipboard(taskname)" size="small">
    copier
  </el-button>
  <el-button @click="restartTask(taskname)" size="small"> Relancer </el-button>
  <el-button type="danger" @click="deleteTask(taskID)" size="small">
    Supprimer
  </el-button>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    taskID: {
      type: String,
      required: true,
    },
    taskname: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteTask", "restartTask"]),
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      this.$notify({
        title: "Succès",
        message: `Le nom de la tache ${text} a été copié dans le presse-papier`,
        type: "success",
        offset: 50,
        duration: 3000,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
