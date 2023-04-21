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
  background: var(--background);
  color: var(--text-color);
}
html{
  background: var(--background);
  color: var(--text-color);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}
.slide-enter-to {
  position: absolute;
  bottom: 0;
}
.slide-enter-from {
  position: absolute;
  bottom: -50%;
}
.slide-leave-to {
  position: absolute;
  top: -50%;
}
.slide-leave-from {
  position: absolute;
  top: 0;
}
</style>
