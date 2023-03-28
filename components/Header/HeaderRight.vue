<script setup lang="ts">
import HeaderLink from './HeaderLink.vue'
import { SITE } from '~~/config/param'
</script>

<template>
  <div class="flex-1 text-right md:-mr-1 mr-1 flex flex-row justify-end items-center">
    <HeaderLink :href="SITE.homePage">
      Weekly
    </HeaderLink>

    <HeaderLink :href="SITE.profilePage">
      Profile
    </HeaderLink>

    <HeaderLink :href="`https://github.com/${SITE.githubId}`" target="_blank">
      <p class="md:inline-block hidden">
        GitHub
      </p>
    </HeaderLink>

    <HeaderLink href="https://bento.me/pinky-pig" target="_blank" class="lg:inline-block hidden">
      <p class="md:inline-block hidden">
        More
      </p>
    </HeaderLink>
  </div>
</template>

<style scoped>
</style>
