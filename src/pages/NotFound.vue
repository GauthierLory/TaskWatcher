<template>
  <div>
    <h1>404</h1>
    <p>{{ $route.params.wrongPath }}</p>
    <el-button @click="$router.go(-1)" type="primary" round>
      Go back
    </el-button>
  </div>
</template>

<script>
export default {
  name: "VueTrackerNotFound",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
