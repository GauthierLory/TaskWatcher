<template>
  <div>
    <h1>Setings</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    mounted () {
      console.log("this.$route", this.$route)
    }
}
</script>

<style lang="scss" scoped>
</style>
