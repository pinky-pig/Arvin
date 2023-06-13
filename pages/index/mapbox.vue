<script setup lang="ts">
definePageMeta({
  notDisappearHearderNav: true,
})
</script>

<template>
  <BentoWrapperPage>
    <template #title>
      Mapbox
    </template>

    <div class="mapbox-container h-full w-full flex items-center justify-center rounded-3xl bg-[var(--card--placeholder-bg)]">
      <div class="map grid h-full w-full place-items-center rounded-3xl">
        mapbox
        <UPopover>
          <UButton color="white" label="Open" trailing-icon="i-heroicons-chevron-down-20-solid" />

          <template #panel>
            <div class="p-4">
              Content
            </div>
          </template>
        </UPopover>
      </div>
    </div>
  </BentoWrapperPage>
</template>
