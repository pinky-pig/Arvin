<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <BentoWrapperCard>
    <div class="h-52px w-52px" i-carbon-draw @click="isOpen = true" />

    <ClientOnly>
      <UModal v-model="isOpen">
        <FreeDraw />
      </UModal>
    </ClientOnly>
  </BentoWrapperCard>
</template>
