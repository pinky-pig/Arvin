<script setup lang="ts">
// 1.总共有两列，每一列里面有两列
// 2.每列有四个格子，间距为 10
// 3.组件能占分别是 1,2 两种
// 4.这里先假设每个单元格的尺寸为 100*100
import GridCellOne from './components/GridCellOne.vue'
import GridCellTwo from './components/GridCellTwo.vue'
import GridCellThree from './components/GridCellThree.vue'
import GridCellFour from './components/GridCellFour.vue'
import GridCellFive from './components/GridCellFive.vue'
import GridCellSix from './components/GridCellSix.vue'
import { initGridContainer } from '.'
import type { GridCellsType } from '.'

const props = defineProps({
  gridCells: {
    default: [
      { id: '1', x: 1, y: 1, width: 1, height: 1, component: markRaw(GridCellOne) },
      { id: '2', x: 2, y: 1, width: 1, height: 1, component: markRaw(GridCellTwo) },
      { id: '3', x: 3, y: 1, width: 1, height: 1, component: markRaw(GridCellThree) },
      { id: '4', x: 4, y: 1, width: 1, height: 2, component: markRaw(GridCellFour) },
      { id: '5', x: 1, y: 2, width: 2, height: 1, component: markRaw(GridCellFive) },
      { id: '6', x: 3, y: 2, width: 2, height: 1, component: markRaw(GridCellSix) },
    ] as GridCellsType[],
  },
})

const cellBox = {
  width: 100,
  height: 100,
}

const gridCells = ref(props.gridCells)
const gridContainerRef = ref()

const currentClickedElement: Ref<any> = ref()
const proxyBox = ref<GridCellsType>({
  id: 'proxy',
  index: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})
// 1.初始化盒子，给盒子添加鼠标点击事件
onMounted(() => {
  initGridContainer(gridContainerRef, gridCells, currentClickedElement, props, proxyBox, cellBox)
})
</script>

<template>
  <div
    ref="gridContainerRef"
    style="touch-action:none;height: 60vh;width:80vw;position: relative; border: 1px solid black; margin-left: auto; margin-right: auto;"
  >
    <component
      :is="item.component"
      v-for="item, index in gridCells"
      :id="`${item.id}`"
      :key="item.id"
      v-model="gridCells[index]"
      :class="item !== currentClickedElement ? 'grid-item' : ''"
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
      class="bg-gray-400 grid-item"
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
.grid-item {
  /* border: 1px solid black;
  transition: all 500ms ease 0s;
  will-change: transform; */
}
</style>
