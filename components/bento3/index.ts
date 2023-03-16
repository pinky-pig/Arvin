/* eslint-disable no-console */
import type { Ref } from 'vue'
import { getArea } from './utils/area'
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
      console.log('开始拖拽')
      // 提供一个占位的
      proxyBox.value = Object.assign({}, currentClickedElement.value)
      const index = gridCells.value.findIndex((ele: { id: any }) => ele.id === currentClickedElement.value.id)
      if (index !== -1) {
        const ele = gridCells.value.splice(index, 1)
        gridCells.value.push(ele[0])
      }
    }

    area = getArea(gridCells.value)
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

      // 获取proxy的位置，然后判断是否碰撞到其他的元素
      // const ele = getElementAtPosition(
      //   (currentClickedElement.value.x + currentClickedElement.value.width / 2) * cellBox.width,
      //   (currentClickedElement.value.y + currentClickedElement.value.height / 2) * cellBox.height,
      // )
      // ele && console.log(ele, '碰撞的要素')

      // 1.碰到其他元素后，就按照下面的走
      // const minDistanceEle = getMinDistanceElementFromCurrentElement()
      // minDistanceEle && console.log(minDistanceEle, '最近的一个要素')

      // 1.将当前要素的占位添加到这个位置，currentClickedElement.value.x = ele.x; currentClickedElement.value.y = ele.y
      // 2.將碰撞到的 ele 的位置向下移动， ele.y += currentClickedElement.value.height
      // 3.原来的位置就空出来了，需要补上
      // -- 3.1 遍历所有的元素，找到其下面的那个元素。
      // 勾股定理，每个元素中心点 和 currentClickedElement.value 中心点的距离最小的，并且 y 坐标大于 currentClickedElement.value.y 的元素
      // -- 3.2 将这个元素的 y 坐标减去 currentClickedElement.value.height

      // 2.碰不到其他元素，就直接添加到位置最上
      // if (!ele) {

      // }

      // 1. 四舍五入后
      proxyBox.value.x = Math.round(currentClickedElement.value.x)
      proxyBox.value.y = Math.round(currentClickedElement.value.y)

      /////////////////////////////////////////////////////////////////////////////////////
      // 2. 如果没有碰撞，那么就一直找到最上面的那个位置
      // 3. 如果有碰撞，那么就找到碰撞的元素，然后将当前的元素添加到这个位置
      const objs: any = []
      gridCells.value.forEach((item) => {
        item.id !== currentClickedElement.value.id && objs.push(item)
      })
      area = getArea(objs)

      // proxyBox.value 的 x 就是第几列 在x方向上是第几
      // proxyBox.value 的 y 就是第几行 在y方向上是第几
      // console.log(proxyBox.value)

      // 遍历每一个元素，如果其上面有值，那么就将其下移，如果没有，将移上去
      // gridCells.value.forEach((n: any) => {
      //   if (n.id !== currentClickedElement.value.id) {
      //     const y = bubbleUp(n)
      //     if (y < n.y)
      //       n.y = y
      //   }
      // })

      // // 代理元素
      // const y = bubbleUp(proxyBox.value)
      // if (y < proxyBox.value.y)
      //   proxyBox.value.y = y

      // // 从下往上找，一直找到最上层空值的位置
      // function bubbleUp(node: any) {
      //   for (let row = node.y - 1; row > 0; row--) {
      //   // 如果一整行都为空，则直接继续往上找
      //     if (area[row] === undefined)
      //       continue
      //     for (let col = node.x; col < node.x + node.width; col++) {
      //     // 改行如果有内容，则直接返回下一行
      //       if (area[row][col] !== undefined)
      //         return row + 1
      //     }
      //   }
      //   return 1
      // }

      ///////////////////////////////////////////////////////////////////////////////

      overlap(proxyBox.value)
      function overlap(node: any) {
        // 碰撞检测，查找一起碰撞节点里面，位置最靠上的那个
        gridCells.value.forEach((n) => {
          if (node.id !== n.id) {
            if (checkHit(node, n)) {
              // 如果有碰撞，碰撞的这一行及下面的所有的要素，前部都下移
              gridCells.value.forEach((n) => {
                if (node.id !== n.id) {
                  if (n.y >= node.y)
                    n.y += node.height
                }
              })
            }
          }
        })

        area = getArea([...objs, proxyBox.value])
        console.log(area)

        gridCells.value.forEach((n: any) => {
          if (n.id !== currentClickedElement.value.id) {
            const y = bubbleUp(n)
            if (y < n.y)
              n.y = y
          }
        })
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
    console.log('拖拽结束')
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

  /**
   * 获取这个位置的要素
   * @param x x 坐标
   * @param y y 坐标
   * @returns 要素
   */
  function getElementAtPosition(x: number, y: number): any {
    let hitElement: any | null = null

    // We need to to hit testing from front (end of the array) to back (beginning of the array)

    const objs: any = [proxyBox.value]
    gridCells.value.forEach((item) => {
      item.id !== currentClickedElement.value.id && objs.push({
        ...item,
        x: item.x * cellBox.width,
        y: item.y * cellBox.height,
        width: item.width * cellBox.width,
        height: item.height * cellBox.height,
      })
    })
    for (let i = objs - 1; i >= 0; --i) {
      if (hitTest(objs, x, y)) {
        hitElement = objs[i]
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
