<script setup lang="ts">
const route = useRoute()

const whitelist = ['/blog/content']
const isNoneLayout = computed(() => whitelist.includes(route.path))

const isLargeScreen = useMediaQuery('(min-width: 720px)')
</script>

<template>
  <main
    :class="
      isNoneLayout
        ? ''
        : 'pt-84px md:pt-180px pb-20 px-5 overflow-x-hidden min-h-screen md:pt-136px'
    "
  >
    <Header v-show="!isLargeScreen || !isNoneLayout" />
    <slot />
    <Footer />
  </main>
</template>
