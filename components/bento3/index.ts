/* eslint-disable no-console */
import type { Ref } from 'vue'
import { hitTest } from './utils/hitTest'

export interface GridCellsType {
  id: string
  x: number
  y: number
  width: number
  height: number
  [key: string]: any
}

let mouseFrom = { x: 0, y: 0 }
let mouseTo = { x: 0, y: 0 }
let isDragging = false
const columnsWidth = 300

export function initGridContainer(
  containerRef: Ref<HTMLElement>,
  gridCells: Ref<GridCellsType[]>,
  currentClickedElement: Ref<any>,
  propsOption: any,
  proxyBox: Ref<GridCellsType>,
  cellBox: { width: number; height: number },
) {
  // 绑定鼠标事件
  addMouseEvent()
  function addMouseEvent() {
    window.addEventListener('pointerdown', mousedown, false)
    window.addEventListener('pointermove', mousemove, false)
    window.addEventListener('pointerup', mouseup, false)
  }
  function mousedown(e: MouseEvent) {
    mouseFrom = { x: e.clientX, y: e.clientY }

    currentClickedElement.value = getCellObjectInStoreFromPosition(mouseFrom)
    if (currentClickedElement.value) {
      isDragging = true
      console.log('开始拖拽')
      // 提供一个占位的
      proxyBox.value = Object.assign({}, currentClickedElement.value)
      const index = gridCells.value.findIndex((ele: { id: any }) => ele.id === currentClickedElement.value.id)
      if (index !== -1) {
        const ele = gridCells.value.splice(index, 1)
        gridCells.value.push(ele[0])
      }
    }
  }
  function mousemove(e: MouseEvent) {
    mouseTo = { x: e.clientX, y: e.clientY }
    const disX = (mouseTo.x - mouseFrom.x) / cellBox.width
    const disY = (mouseTo.y - mouseFrom.y) / cellBox.height
    const rect = containerRef.value?.getBoundingClientRect()
    if (!rect)
      return

    if (isDragging) {
      currentClickedElement.value.x += disX
      currentClickedElement.value.y += disY

      mouseFrom = { x: e.clientX, y: e.clientY }

      // 获取proxy的位置，然后判断是否碰撞到其他的元素
      const ele = getElementAtPosition(
        (currentClickedElement.value.x + currentClickedElement.value.width / 2) * cellBox.width,
        (currentClickedElement.value.y + currentClickedElement.value.height / 2) * cellBox.height,
      )
      ele && console.log(ele, '碰撞的要素')

      // const minDistanceEle = getMinDistanceElementFromCurrentElement()
      // minDistanceEle && console.log(minDistanceEle, '最近的一个要素')

      // 1.将当前要素的占位添加到这个位置，currentClickedElement.value.x = ele.x; currentClickedElement.value.y = ele.y
      // 2.將碰撞到的 ele 的位置向下移动， ele.y += currentClickedElement.value.height
      // 3.原来的位置就空出来了，需要补上
      // -- 3.1 遍历所有的元素，找到其下面的那个元素。
      // 勾股定理，每个元素中心点 和 currentClickedElement.value 中心点的距离最小的，并且 y 坐标大于 currentClickedElement.value.y 的元素
      // -- 3.2 将这个元素的 y 坐标减去 currentClickedElement.value.height
    }
  }
  function mouseup(_e: MouseEvent) {
    currentClickedElement.value = null
    mouseFrom.x = 0
    mouseFrom.y = 0
    isDragging = false
    console.log('拖拽结束')
  }
  // 获取当前点击的元素
  function getCellObjectInStoreFromPosition(position: { x: number; y: number }): Object | null {
    let result: any = null
    const point = { x: position.x, y: position.y }
    console.log(point.x, point.y)

    const initElement = document.elementFromPoint(point.x, point.y)
    if (initElement)
      result = gridCells.value.filter((ele: { id: string }) => ele.id === initElement.id)

    return result ? result[0] : null
  }

  /**
   * 获取这个位置的要素
   * @param x x 坐标
   * @param y y 坐标
   * @returns 要素
   */
  function getElementAtPosition(x: number, y: number): any {
    let hitElement: any | null = null

    const board = [
      { id: '', x: 1, y: 1, width: 1, height: 1, component: '' },
      { id: '', x: 2, y: 1, width: 1, height: 1, component: '' },
      { id: '', x: 3, y: 1, width: 1, height: 1, component: '' },
      { id: '', x: 4, y: 1, width: 1, height: 1, component: '' },
      { id: '', x: 1, y: 2, width: 1, height: 1, component: '' },
      { id: '', x: 2, y: 2, width: 1, height: 1, component: '' },
      { id: '', x: 3, y: 2, width: 1, height: 1, component: '' },
      { id: '', x: 4, y: 2, width: 1, height: 1, component: '' },
      { id: '', x: 1, y: 3, width: 1, height: 1, component: '' },
      { id: '', x: 2, y: 3, width: 1, height: 1, component: '' },
      { id: '', x: 3, y: 3, width: 1, height: 1, component: '' },
      { id: '', x: 4, y: 3, width: 1, height: 1, component: '' },
      { id: '', x: 1, y: 4, width: 1, height: 1, component: '' },
      { id: '', x: 2, y: 4, width: 1, height: 1, component: '' },
      { id: '', x: 3, y: 4, width: 1, height: 1, component: '' },
      { id: '', x: 4, y: 4, width: 1, height: 1, component: '' },
    ]
    // We need to to hit testing from front (end of the array) to back (beginning of the array)
    for (let i = gridCells.value.length - 1; i >= 0; --i) {
      const cell = {
        ...gridCells.value[i],
        ...{
          x: gridCells.value[i].x * cellBox.width,
          y: gridCells.value[i].y * cellBox.height,
          width: gridCells.value[i].width * cellBox.width,
          height: gridCells.value[i].height * cellBox.height,
        },
      }
      if (hitTest(cell, x, y)) {
        hitElement = gridCells.value[i]
        break
      }
    }
    return hitElement
  }

  function getMinDistanceElementFromCurrentElement() {
    // 勾股定理，每个元素中心点 和 proxyBox.value 中心点的距离最小的，并且 y 坐标大于 proxyBox.value.y 的元素
    let hitElement: any | null = 0
    let minDistance = 0
    for (let i = gridCells.value.length - 1; i >= 0; --i) {
      // 不是当前点击的元素

      if (gridCells.value[i].id !== proxyBox.value.id) {
        const a = gridCells.value[i].x - proxyBox.value.x
        const b = gridCells.value[i].y - proxyBox.value.y
        const distance = Math.sqrt(a ** 2 + b ** 2)
        console.log(distance)

        if (i === 0) {
          minDistance = distance
          hitElement = gridCells.value[i]
        }

        // 这里还需要判断 y 值的大小
        if (minDistance > distance) {
          minDistance = distance
          hitElement = gridCells.value[i]
        }
      }
    }
    console.log(hitElement)
    return hitElement
  }
}
