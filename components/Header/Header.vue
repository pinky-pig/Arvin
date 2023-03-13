<script setup lang="ts">
import { SITE } from '../../config'
import AstroLogo from './AstroLogo.vue'
import HeaderRight from './HeaderRight.vue'
</script>

<template>
  <header>
    <nav
      class="header-container mb-5 flex transition-all flex-row text-32px px-3 py-4 mx-auto w-full md:max-w-2xl lg:max-w-5xl xl:max-w-88rem max-w-384px"
    >
      <div class="flex place-items-center gap-1 text-[2rem] w-200px flex-shrink-0 flex-grow-0">
        <a href="/" class="flex place-items-center">
          <AstroLogo :size="40" />
        </a>
        <a href="/">
          <p class="text-gray-800 font-extrabold">{{ SITE.title }}</p>
        </a>
      </div>
      <HeaderRight />
    </nav>
  </header>
</template>

<style>
.header-container {
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
}
</style>
