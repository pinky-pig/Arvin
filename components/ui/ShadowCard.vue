<script setup lang="ts">

</script>

<template>
  <div class="card-outer">
    <div class="card-content">
      <slot name="default" />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card-outer {
  background: var(--ui-main-bg);
  color: var(--ui-main-text);
  border-radius: 10px;
  padding: 15px;
  position: relative;
  box-shadow: var(--ui-main-box-shadow);
  display: flex;
  flex-direction: column;
}
.card-footer {
  padding: 1.5em;
}
.card-content{
  flex: 1 1 0%;
  background: var(--ui-second-bg);
  border-radius: 5px;
  transition: all .3s;
  box-shadow: var(--ui-second-box-shadow);
}
</style>
