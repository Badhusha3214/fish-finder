<template>
  <RouterView />
</template>


<script>
  import { RouterView } from 'vue-router'
  import NetworkStatus from '@/views/NetworkStatus.vue';

export default {
  components: {
    NetworkStatus,
    RouterView
  }
}
</script>


<style lang="scss">
  @import "@/scss/main.scss";
</style>
