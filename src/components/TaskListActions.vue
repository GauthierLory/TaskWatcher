<template>
  <TaskListActionsButton @click="restartTask(taskID)" type="primary" icon="video-play">
    <template #text>
      Redémarrer
    </template>
  </TaskListActionsButton>
  <TaskListActionsButton @click="copyToClipboard(taskname)" type="default" icon="CopyDocument">
    <template #text>
      Copier
    </template>
  </TaskListActionsButton>
  <TaskListActionsButton @click="deleteTask(taskID)" type="danger" icon="Delete">
    <template #text>
      Supprimer
    </template>
  </TaskListActionsButton>
</template>

<script>
import { mapActions } from "vuex";
import TaskListActionsButton from './TaskListActionsButton.vue'

export default {
  components: {
    TaskListActionsButton
  },
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

<style lang="scss" scoped>

</style>
