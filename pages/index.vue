<script setup lang="ts">
import Home from './home/index.vue'
const online = useOnline()
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <Home v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
