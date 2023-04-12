<script setup lang="ts">
import Bento from './bento/index.vue'

const online = useOnline()
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <Bento v-if="online" />
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
