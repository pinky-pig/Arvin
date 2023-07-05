<script setup lang="ts">
import Bento from './bento.vue'
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <Bento />
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
