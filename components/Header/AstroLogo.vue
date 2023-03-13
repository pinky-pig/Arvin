<script setup lang="ts">
import { SITE } from '../../config'

const props = defineProps(['size'])
</script>

<template>
  <img
    :src="SITE.icon"
    :alt="SITE.title"
    :width="props.size"
    :height="props.size"
  >
</template>
