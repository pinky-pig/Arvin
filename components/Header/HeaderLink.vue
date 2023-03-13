<script setup lang="ts">
export interface Props extends astroHTML.JSX.AnchorHTMLAttributes {}

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
    font-weight: bold !important;
    color: #1F2937 !important;
  }
  a.active {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
