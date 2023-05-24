<script setup>
definePageMeta({
  layout: 'none',
})

const route = useRoute()
const blog = ref('/01')
if (route.query.blog)
  blog.value = route.query.blog
</script>

<template>
  <div class="layout">
    <ContentDoc class="heti" :path="blog" />
  </div>
</template>

<style scoped>
.layout {
  padding: 1rem;
  max-width: 50rem;
}
</style>
