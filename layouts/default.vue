<!-- eslint-disable no-console -->
<script setup lang="ts">
const route = useRoute()

const whitelist = ['/blog/content']
const isNoneLayout = computed(() => whitelist.some(item => route.path.startsWith(item)))
console.log(isNoneLayout)
</script>

<template>
  <main
    :class=" !isNoneLayout ? 'pt-180px pb-20 px-5 overflow-x-hidden min-h-screen md:pt-136px' : '' "
  >
    <Header v-if="!isNoneLayout" />
    <slot />
    <Footer v-if="!isNoneLayout" />
  </main>
</template>
