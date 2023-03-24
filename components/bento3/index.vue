<script setup lang="ts">
// 1.总共有两列，每一列里面有两列
// 2.每列有四个格子，间距为 10
// 3.组件能占分别是 1,2 两种
// 4.这里先假设每个单元格的尺寸为 100*100
import { initGridContainer } from './index.module'
import type { BentoCellsType } from './index.module'
import { cfg } from './config'

const props = defineProps({
  bentoCells: {
    default: cfg as BentoCellsType[],
  },
  maximumCells: {
    default: 4,
  },
})
const emit = defineEmits(['dragStart', 'dragEnd'])

const cellBox = {
  width: 100,
  height: 100,
}

const bentoCells = ref(props.bentoCells)
const bentoContainerRef = ref()

const currentClickedElement: Ref<any> = ref()
const proxyBox = ref<BentoCellsType>({
  id: 'proxy',
  index: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})
// 1.初始化盒子，给盒子添加鼠标点击事件
onMounted(() => {
  initGridContainer(bentoContainerRef, bentoCells, currentClickedElement, proxyBox, cellBox, props, emit)
})
</script>

<template>
  <div
    ref="bentoContainerRef"
    class="bento-container"
  >
    <component
      :is="item.component"
      v-for="item, index in bentoCells"
      :id="`${item.id}`"
      :key="item.id"
      v-model="bentoCells[index]"
      style="border-radius: 9px;"
      :class="item !== currentClickedElement ? 'bento-item ' : 'z-9'"
      :style="{
        position: 'absolute',
        left: `${item.x * cellBox.width}px`,
        top: `${item.y * cellBox.height}px`,
        width: `${item.width * cellBox.width}px`,
        height: `${item.height * cellBox.height}px`,
      }"
    />
    <div
      v-show="currentClickedElement"
      class="bento-item-placeholder"
      :style="{
        position: 'absolute',
        left: `${proxyBox.x * cellBox.width}px`,
        top: `${proxyBox.y * cellBox.height}px`,
        width: `${proxyBox.width * cellBox.width}px`,
        height: `${proxyBox.height * cellBox.height}px`,
      }"
    />
  </div>
</template>

<style scoped>
.bento-container{
  touch-action:none;
  height: 60vh;
  width:80vw;
  position: relative;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
.bento-item {
  transition: all 500ms ease 0s;
  will-change: transform;
  box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05), 0px 0px 16px -8px rgba(0, 0, 0, 0.05), 0px 0px 16px -12px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #ffffff;
  overflow: hidden;
  border-radius: 9px;
}
.bento-item-placeholder{
  transition: all 500ms ease 0s;
  will-change: transform;
  background-color: #e3e3e3;
  box-shadow: 0px 0px 16px -1px rgba(0, 0, 0, 0.05), 0px 0px 16px -8px rgba(0, 0, 0, 0.05), 0px 0px 16px -12px rgba(0, 0, 0, 0.12), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
  border: 1px solid #e3e3e3;
  overflow: hidden;
  border-radius: 9px;
}
</style>
