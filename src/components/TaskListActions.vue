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
    // ...mapActions(["deleteTask", "restartTask"]),
    ...mapActions({
      deleteTask: 'tasks/deleteTask',
      restartTask: 'tasks/restartTask',
      sendSuccess: 'notifications/sendSuccess',
    }),
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      this.sendSuccess({
        title: "Succès",
        message: `Le nom de la tache ${text} a été copié dans le presse-papier`
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
