<script setup lang="ts">
const props = defineProps(['href', 'class'])

// const isActive = href === Astro.url.pathname.replace(/\/$/, '');
</script>

<template>
  <a :href="props.href">
    <slot />
  </a>
</template>

<style scoped>
a {
    display: inline-block;
    text-decoration: none;
    font-size: 1.1rem;
    margin-left: 1rem;
    margin-top: 0.3rem;
    /* color: #1F2937 !important; */
  }
  a.active {
    text-decoration: underline;
  }
</style>
