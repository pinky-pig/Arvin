<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <UiShadowCard class="!p-5px">
    <div class="grid h-full w-full place-items-center text-[--text-color]" @click="isOpen = true">
      <div class="pointer-events-auto h-30px w-30px cursor-pointer" i-carbon:blockchain />
    </div>

    <Teleport v-if="isOpen" to="body">
      <div class="fixed left-0 top-0 h-full w-full">
        <WaveMotion v-if="isOpen" />
      </div>
    </Teleport>
  </UiShadowCard>
</template>
