<script setup lang="ts">

</script>

<template>
  <div class="small-button">
    <slot />
  </div>
</template>

<style scoped>
.small-button {
  min-width: 30px;
  min-height: 30px;
  color: var(--ui-main-text);
  white-space: nowrap;
  cursor: pointer;
  background-color: var(--ui-main-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 1em;
  text-decoration: none;
  transition: all .3s;
  border: 1px var(--ui-main-border);
  box-shadow: var(--ui-main-box-shadow);
}

.small-button:hover {
  box-shadow: var(--ui-main-hover-box-shadow);
}
</style>
