<script setup lang="ts">
const route = useRoute()

const whitelist = ['/blog/content-sidebar']
const isNoneLayout = computed(() => whitelist.includes(route.path))

const isLargeScreen = useMediaQuery('(min-width: 720px)')
</script>

<template>
  <Transition name="slide-fade-from-up" mode="out-in">
    <main
      class="bg-[var(--background)] md:bg-[var(--bg-main-color)]"
      :class="isNoneLayout ? '' : 'pt-100px md:pt-100px pb-20 px-10px md:px-5 overflow-x-hidden min-h-screen md:pt-112px '"
    >
      <Header v-show="!isLargeScreen || !isNoneLayout" />
      <slot />
      <Footer />
    </main>
  </Transition>
</template>
