<script lang="ts" setup>
import VueSimplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
</script>

<template>
  <VueSimplebar data-simplebar-auto-hide="true">
    <slot />
  </VueSimplebar>
</template>

<style>
.simplebar-scrollbar::before {
  background-color: #999;
}
</style>
