import type { GridCellsType } from '..'
// 将数组转化为二维数组
export function getArea(nodes: GridCellsType[]) {
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
