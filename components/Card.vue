<template>
  <div class="card-container">
    <slot />
  </div>
</template>

<style scoped>
.card-container {
  background-color: var(--second-bg-color);
  border-color: var(--second-bg-color-light);
  border-width: 5px;
  border-style: solid;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 12px !important;
  cursor: pointer;
}
</style>
