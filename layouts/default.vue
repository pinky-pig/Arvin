<script setup lang="ts">
const route = useRoute()

const whitelist = ['/blog/content']
const isNoneLayout = computed(() => whitelist.includes(route.path))

const isLargeScreen = useMediaQuery('(min-width: 720px)')
</script>

<template>
  <main
    class="bg-[var(--bg-main-color)]"
    :class=" isNoneLayout ? '' : 'pt-100px md:pt-100px pb-20 px-10px md:px-5 overflow-x-hidden min-h-screen md:pt-112px ' "
  >
    <Header v-show="!isLargeScreen || !isNoneLayout" />
    <slot />
    <Footer />
  </main>
</template>
