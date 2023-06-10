<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <BlogContent :path="route.path.replace(/\/blog/g, '')" />
  </div>
</template>
