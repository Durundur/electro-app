<template>
  <div class="text-center mb-4">
    <v-pagination density="comfortable" :length="lastPage" total-visible="3" v-model="page" rounded="circle"></v-pagination>
  </div>
</template>
<script>
export default {
  props: {
    lastPage: {
      type: Number,
      default: 25,
    },
    currentPage: {
      type: Number,
      default: 2,
    },
  },
};
</script>
<style scoped>
</style>
