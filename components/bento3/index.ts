import type { Ref } from 'vue'
import { getArea } from './utils/area'

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
let area: any = []
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
      // 提供一个占位的
      proxyBox.value = Object.assign({ tag: 'proxy' }, currentClickedElement.value)
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

      // 限制拖拽范围
      if (currentClickedElement.value.x < 1)
        currentClickedElement.value.x = 1
      if (currentClickedElement.value.x + currentClickedElement.value.width > 5)
        currentClickedElement.value.x = 5 - currentClickedElement.value.width
      if (currentClickedElement.value.y < 1)
        currentClickedElement.value.y = 1
      mouseFrom = { x: e.clientX, y: e.clientY }

      proxyBox.value.x = Math.round(currentClickedElement.value.x)
      proxyBox.value.y = Math.round(currentClickedElement.value.y)

      /////////////////////////////////////////////////////////////////////////////////////

      // 所有元素，当前的元素用代理元素替换
      const allCellsWithProxyByCurrent: any = []
      gridCells.value.forEach((item) => {
        if (item.id === currentClickedElement.value.id)
          allCellsWithProxyByCurrent.push(proxyBox.value)
        else
          allCellsWithProxyByCurrent.push(item)
      })

      // 开始拖拽重排
      rearrange(proxyBox.value)
      function rearrange(node: any) {
        // 1.如果有碰撞，碰撞的这一行及下面的所有的要素，全部都下移
        gridCells.value.forEach((n) => {
          if (node.id !== n.id && checkHit(node, n)) {
            gridCells.value.forEach((n) => {
              if (node.id !== n.id) {
                if (n.y >= node.y)
                  n.y += node.height
              }
            })
          }
        })

        // 2.将每个元素冒泡放置最顶层
        area = getArea(allCellsWithProxyByCurrent)

        allCellsWithProxyByCurrent.forEach((n: any) => {
          const y = bubbleUp(n)
          if (y < n.y)
            n.y = y
        })
      }
      function bubbleUp(node: any) {
        for (let row = node.y - 1; row > 0; row--) {
          // 如果一整行都为空，则直接继续往上找
          if (area[row] === undefined)
            continue
          for (let col = node.x; col < node.x + node.width; col++) {
            // 改行如果有内容，则直接返回下一行
            if (area[row][col] !== undefined)
              return row + 1
          }
        }
        return 1
      }
      function checkHit(node1: any, node2: any) {
        if (
          node1.x < node2.x + node2.width
          && node2.x < node1.x + node1.width
          && node1.y < node2.y + node2.height
          && node2.y < node1.y + node1.height
        )
          return true

        return false
      }
    }
  }

  function mouseup(_e: MouseEvent) {
    if (currentClickedElement.value) {
      currentClickedElement.value.x = Math.round(proxyBox.value.x)
      currentClickedElement.value.y = Math.round(proxyBox.value.y)
      currentClickedElement.value = null
    }
    mouseFrom.x = 0
    mouseFrom.y = 0
    isDragging = false
  }
  // 获取当前点击的元素
  function getCellObjectInStoreFromPosition(position: { x: number; y: number }): Object | null {
    let result: any = null
    const point = { x: position.x, y: position.y }
    const initElement = document.elementFromPoint(point.x, point.y)
    if (initElement)
      result = gridCells.value.filter((ele: { id: string }) => ele.id === initElement.id)

    return result ? result[0] : null
  }
}
