<template>
  <h2>Application</h2>
  <el-row>
    <el-col
      :offset="6"
      :span="12"
    >
      <p>Clé secrète de votre API JSONbin.io :</p>
      <el-input
        v-model="inputValueJsonBinKey"
        placeholder="API KEY"
      />
      <p>ID de votre bin :</p>
      <el-input
        v-model="inputValueJsonBinID"
        placeholder="BIN ID"
      />
      <el-button
        type="primary"
        :loading="areNewValuesBeingTested"
        @click="updateApiValues"
      >
        Confirmer
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import { updateAxiosInstance } from '../services/TaskService.js'
export default {
  data () {
    return {
      inputValueJsonBinKey: '',
      inputValueJsonBinID: '',
      areNewValuesBeingTested: false
    }
  },

  methods: {
    ...mapActions({
      fetchAllTasks: 'tasks/fetchAllTasks',
      sendSuccess: 'notifications/sendSuccess',
      sendError: 'notifications/sendError'
    }),

    async updateApiValues () {
      // Mise à jour des valeurs de JSONBin.io
      this.areNewValuesBeingTested = true
      if (this.inputValueJsonBinKey !== '') {
        localStorage.setItem('jsonBinKey', this.inputValueJsonBinKey)
      } else {
        localStorage.removeItem('jsonBinKey')
      }
      if (this.inputValueJsonBinID !== '') {
        localStorage.setItem('jsonBinID', this.inputValueJsonBinID)
      } else {
        localStorage.removeItem('jsonBinID')
      }
      // Tests dela connexion avec JSONBin.io
      updateAxiosInstance()
      try {
        await this.fetchAllTasks()
        localStorage.setItem('jsonBinAccess', true)
        this.$emit('updateTasks')
        this.sendSuccess({
          title: 'Succès',
          message: 'Vos clés sont enregistrés dans ce navigateur'
        })
      } catch (e) {
        localStorage.removeItem('jsonBinAccess')
        this.sendError({
          title: 'Erreur',
          message: 'Cette combinaison de fonctionne pas sur JSONBin.io'
        })
      }
      this.areNewValuesBeingTested = false
    }
  },

  created () {
    // Mise en place des valeurs du localStorage sur l'instance
    const jsonBinKey = localStorage.getItem('jsonBinKey')
    const jsonBinID = localStorage.getItem('jsonBinID')
    if (jsonBinKey) {
      this.inputValueJsonBinKey = jsonBinKey
    }
    if (jsonBinID) {
      this.inputValueJsonBinID = jsonBinID
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  text-align: left;
}
.el-button {
  margin-top: 20px;
}
</style>
