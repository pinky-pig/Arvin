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
  <div class="">
    <ContentDoc class=" text-start" :path="blog" />
  </div>
</template>
