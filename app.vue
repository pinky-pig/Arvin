<script setup lang="ts">
import { appName } from '~/constants'
import '~~/components/lit-components'
useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import './styles/index.css';
@import './styles/theme.css';

html, body , #__nuxt{
  margin: 0;
  padding: 0;
  min-height: 100vh;

  background-image: repeating-linear-gradient(to right,var(--bg-color),var(--bg-color) 1px,transparent 1px,transparent 30px),
  repeating-linear-gradient(to bottom,var(--bg-color),var(--bg-color) 1px,transparent 1px,transparent 30px);
}

html.dark {
  background: #090C10;
  color: white;
}
html{
  background: rgb(247, 242, 242);
}
</style>
