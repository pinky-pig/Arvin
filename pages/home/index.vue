<script setup lang="ts">
import Bento from '~/components/bento/index.vue'
</script>

<template>
  <div
    class="box-border mx-auto transition-all -mt-5 mb-12 md:box-border box-content pr-3 w-full max-w-xl md:max-w-2xl xl:max-w-88rem lg:max-w-5xl"
  >
    <!-- <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mx-0 md:-mr-5 mr-0">
      <Card v-for="index in 2" :key="index" />
    </div> -->
    <Bento />
  </div>
</template>
