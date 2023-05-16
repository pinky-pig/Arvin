<script setup lang="ts">
// import Simplebar from '~/components/Simplebar.vue'
</script>

<template>
  <!-- <Simplebar class="w-full h-full"> -->
  <main class="pt-180px md:pt-136px pb-20 px-5 text-center overflow-x-hidden min-h-screen">
    <Header />
    <slot />
    <Footer />
  </main>
  <!-- </Simplebar> -->
</template>
