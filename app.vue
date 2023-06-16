<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
AppSetup()
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import './styles/index.css';
html, body , #__nuxt{
  margin: 0;
  padding: 0;
  min-height: 100vh;

  background-image: repeating-linear-gradient(to right,var(--bg-color),var(--bg-color) 1px,transparent 1px,transparent 30px),
  repeating-linear-gradient(to bottom,var(--bg-color),var(--bg-color) 1px,transparent 1px,transparent 30px);
}

html.dark {
  background: var(--background);
  color: var(--text-color);
}
html{
  background: var(--background);
  color: var(--text-color);
}
</style>
