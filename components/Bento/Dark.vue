<script setup lang="ts">
// https://uiverse.io/alexruix/splendid-liger-23
const color = useColorMode()
useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

const checkboxRef = ref(null as HTMLInputElement | null)
onMounted(() => {
  checkboxRef.value!.checked = color.value === 'light'
})
watch(color, () => {
  checkboxRef.value!.checked = color.value === 'light'
})

// function toggleDark(e: MouseEvent) {
//   color.preference = color.value === 'dark' ? 'light' : 'dark'
// }
</script>

<template>
  <BentoWrapperCard>
    <label class="switch">
      <input ref="checkboxRef" type="checkbox" @click="toggleDark">
      <span class="slider" />
    </label>
  </BentoWrapperCard>
</template>

<style scoped>
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #28096b;
  transition: .5s;
  border-radius: 30px;
}

/* 月亮模式 */
.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 50%;
  left: 10%;
  bottom: 15%;
  box-shadow: inset 8px -4px 0px 0px #fff000;
  background: #28096b;
  transition: .5s;
}

input:checked + .slider {
  background-color: #522ba7;
}

/* 太阳模式 */
input:checked + .slider:before {
  transform: translateX(100%);
  box-shadow: inset 15px -4px 0px 15px #fff000;
}
</style>
