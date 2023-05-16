<script setup lang="ts">
// import Simplebar from '~/components/Simplebar.vue'
</script>

<template>
  <!-- <Simplebar class="w-full h-full"> -->
  <main
    class="
    pt-180px pb-20 px-5 text-center overflow-x-hidden min-h-screen
    md:pt-136px
  "
  >
    <Header />
    <slot />
    <Footer />
  </main>
  <!-- </Simplebar> -->
</template>
