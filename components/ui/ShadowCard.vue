<script setup lang="ts">

</script>

<template>
  <div class="card-outer">
    <div class="card-content">
      <slot name="default" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card-outer {
  background: var(--ui-second-bg);
  color: var(--ui-main-text);
  border-radius: 20px;
  padding: 15px;
  position: relative;
  box-shadow: var(--ui-main-box-shadow);
  display: flex;
  flex-direction: column;
  gap: 1em ;
}
.card-footer {
  padding: 1.5em;
}
.card-content{
  background: var(--ui-main-bg);
  border-radius: 12px;
  padding: 1.5em;
  transition: all .3s;
  box-shadow: var(--ui-second-box-shadow);
}
</style>
