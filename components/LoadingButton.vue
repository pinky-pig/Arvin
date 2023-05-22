<script setup lang="ts">
const props = defineProps({
  normalText: {
    type: String,
    default: 'Button',
  },
  activatedText: {
    type: String,
    default: 'Loading',
  },
  hasAnimation: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="
      min-w-fit min-h-fit
      relative
      text-center
      bg-[var(--primary-color)]
      rounded-md overflow-hidden
      cursor-pointer
      hover:scale-105
      transition-all duration-300
    "
  >
    <div class=" absolute w-full h-full">
      <span v-if="$slots.default" class="absolute top-1/2 left-1/2 -translate-1/2">
        {{ props.normalText }}
      </span>
      <span v-else-if="props.normalText" class="absolute top-1/2 left-1/2 -translate-1/2">
        {{ props.normalText }}
      </span>
    </div>
    <div
      v-show="props.hasAnimation"
      class="
        activated
        w-full h-full
        text-[#fff]
        absolute top-0 left-0 z-2
        font-bold italic tracking-widest
      "
    >
      <span class="absolute top-1/2 left-1/2 -translate-1/2">
        {{ props.activatedText }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.activated{
  background: linear-gradient(
      135deg,
      var(--primary-color) 0%, var(--primary-color) 20%, var(--second-color) 20%, var(--second-color) 45%, var(--primary-color) 45%,
      var(--primary-color) 70%, var(--second-color) 70%, var(--second-color) 95%, var(--primary-color) 95%, var(--primary-color) 100%
  );
  background-size: 30px 30px;
  background-position: 0 0;
  animation: clickedAnimation 1s infinite linear;
}
@keyframes clickedAnimation {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 30px 0;
  }
}
</style>
