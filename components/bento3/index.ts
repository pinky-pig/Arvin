import type { Ref } from 'vue'

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
let area: string[][] = []
export function initGridContainer(
  containerRef: Ref<HTMLElement>,
  gridCells: Ref<GridCellsType[]>,
  currentClickedElement: Ref<any>,
  propsOption: any,
  proxyBox: Ref<GridCellsType>,
  cellBox: { width: number; height: number },
) {
  bindMouseEvent()
  function bindMouseEvent() {
    window.addEventListener('pointerdown', mousedown, false)
    window.addEventListener('pointermove', mousemove, false)
    window.addEventListener('pointerup', mouseup, false)
  }
  function mousedown(e: MouseEvent) {
    mouseFrom = { x: e.clientX, y: e.clientY }
    currentClickedElement.value = getCellObjectInStoreFromPosition(mouseFrom)
    if (currentClickedElement.value) {
      isDragging = true
      // place-holder
      proxyBox.value = Object.assign({ tag: 'proxy' }, currentClickedElement.value)
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
      // 1.除了当前拖拽的元素之外的所有元素
      const allCellsWithProxyByCurrent: GridCellsType[] = []
      gridCells.value.forEach((item) => {
        if (item.id !== currentClickedElement.value.id)
          allCellsWithProxyByCurrent.push(item)
      })

      // 2.当前的元素要拖拽，于是将当前的元素抽出来，剩下的元素重新排列
      area = getArea(allCellsWithProxyByCurrent)
      const lineCount = area.length
      arrangeByLine()

      // 3.剩下的元素重新排列之后，现在插入当前拖拽的元素
      // 3.1 当前拖拽的元素的位置是四舍五入的 Math.round() ，这里需要将其冒泡到最上面的位置
      // 3.2 冒泡完之后，就是插入。这里插入后，需要将所有的元素重新排列
      // 3.3 重新排列就是将所有碰撞过的元素都下移，这里使用一个递归的方式
      const y = bubbleUp(proxyBox.value)
      if (y < proxyBox.value.y)
        proxyBox.value.y = y

      // 将 allCellsWithProxyByCurrent 按照 area 从上至下的顺序重新排列
      // todo: 这里因为是从上至下的顺序，所以如果有元素被挤下面过多，那么就会出现空白的情况
      // 这样就导致，本来下面的元素往下挤出去很远，然后这个下面的元素没有检测到他上面（就是刚才挤出去的元素）
      // 于是就会出现越过刚才的那个元素向上冒泡
      const allCellByAreaSort = getAllCellsByArea(area, allCellsWithProxyByCurrent)
      hitAllEle(proxyBox.value, allCellByAreaSort)
      // todo: 需要限制递归深度，避免无限递归导致的性能问题
      function hitAllEle(node: GridCellsType, allNodes: GridCellsType[]) {
        const hittedNodes: any = []

        // 1.找到当前元素第一层碰撞的元素
        allNodes.forEach((n: GridCellsType, index: number) => {
          if (node.id !== n.id && checkHit(node, n)) {
            // 将当前碰撞的要素添加到数组中
            hittedNodes.push(n)
          }
        })
        // 2.碰撞到了之后，一格一格移动
        hittedNodes.forEach((n: GridCellsType) => {
          for (let h = n.y + 1; h <= node.y + node.height; h++) {
            n.y = h
            // 每次移动一格之后，就来检测一下，是否还有元素被碰撞
            hitAllEle(n, allNodes)
          }
        })
      }
      function getAllCellsByArea(area: string[][], allCells: GridCellsType[]) {
        const result: GridCellsType[] = []
        // 数组去重
        Array.from(new Set(area.flat())).forEach((cell: string) => {
          allCells.forEach((n) => {
            if (n.id === cell && result.findIndex((ele: GridCellsType) => ele.id === n.id) === -1)
              result.push(n)
          })
        })
        return result
      }
      function arrangeByLine() {
        for (let row = 0; row < lineCount; row++) {
          if (area[row] && area[row].length > 0) {
            area[row].forEach((cell: string) => {
              if (cell) {
                allCellsWithProxyByCurrent.forEach((n) => {
                  if (n.id === cell) {
                    const y = bubbleUp(n)
                    if (y < n.y)
                      n.y = y
                  }
                })
              }
            })
          }
          area = getArea(allCellsWithProxyByCurrent)
        }
      }
      /////////////////////////////////////////////////////////////////////////////////////

      function bubbleUp(node: GridCellsType) {
        for (let row = node.y - 1; row > 0; row--) {
          // 如果一整行都为空，则直接继续往上找
          if (area[row] === undefined)
            continue
          for (let col = node.x; col < node.x + node.width; col++) {
            // todo: 这里需要重构，根据当前这个元素的高度，决定返回的行数是多少
            // const count = allCellsWithProxyByCurrent.filter((n: { id: any }) => n.id === area[row][col])[0]?.height
            if (
              area[row]
              && area[row + 1]
              && area[row][col] !== undefined
              && area[row + 1][col] !== undefined
              && area[row][col] === area[row + 1][col]
            ) {
              // 这里是两行的情况
              //  ██ || ██ ██
              //  ██ || ██ ██
            }
            else
            if (area[row][col] !== undefined) {
              // 这里是一行的情况
              // ██ || ██ ██
              return row + 1
            }
          }
        }

        return 1
      }
      // 检查两个元素是否发生碰撞的功能函数
      // 元素 a 的左侧坐标小于元素 b 的右侧坐标。
      // 元素 a 的右侧坐标大于元素 b 的左侧坐标。
      // 元素 a 的上方坐标小于元素 b 的下方坐标。
      // 元素 a 的下方坐标大于元素 b 的上方坐标
      function checkHit(a: GridCellsType, b: GridCellsType) {
        return (
          a.x < b.x + b.width
          && a.x + a.width > b.x
          && a.y < b.y + b.height
          && a.y + a.height > b.y
        )
      }
    }
  }
  function mouseup(_e: MouseEvent) {
    if (currentClickedElement.value) {
      currentClickedElement.value.x = proxyBox.value.x
      currentClickedElement.value.y = proxyBox.value.y
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

  function getArea(nodes: GridCellsType[]) {
    const area: any = []
    nodes.forEach((n) => {
      for (let row = n.y; row < n.y + n.height; row++) {
        const rowArr = area[row]
        if (rowArr === undefined)
          area[row] = []

        for (let col = n.x; col < n.x + n.width; col++)
          area[row][col] = n.id
      }
    })
    return area
  }
}
