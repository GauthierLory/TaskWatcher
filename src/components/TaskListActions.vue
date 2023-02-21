<template>
  <TaskListActionsButton
    type="primary"
    size="small"
    icon="video-play"
    @click="restartTask(taskID)"
  >
    <template #text>
      Redémarrer
    </template>
  </TaskListActionsButton>
  <TaskListActionsButton
    type="default"
    size="small"
    icon="CopyDocument"
    @click="copyToClipboard(taskname)"
  >
    <template #text>
      Copier
    </template>
  </TaskListActionsButton>
  <TaskListActionsButton
    type="danger"
    size="small"
    icon="Delete"
    @click="deleteTask(taskID)"
  >
    <template #text>
      Supprimer
    </template>
  </TaskListActionsButton>
</template>

<script>
import { mapActions } from 'vuex'
import TaskListActionsButton from './TaskListActionsButton.vue'

export default {
  components: {
    TaskListActionsButton
  },

  props: {
    taskID: {
      type: String,
      required: true
    },

    taskname: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions({
      deleteTask: 'tasks/deleteTask',
      restartTask: 'tasks/restartTask',
      sendSuccess: 'notifications/sendSuccess'
    }),

    copyToClipboard (text) {
      navigator.clipboard.writeText(text)
      this.sendSuccess({
        title: 'Succès',
        message: `Le nom de la tache ${text} a été copié dans le presse-papier`
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
