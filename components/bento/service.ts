import type { TNode } from './config'

export default {
  getArea(nodes: TNode[]) {
    const area: any = []
    nodes.forEach((n) => {
      for (let row = n.y; row < n.y + n.h; row++) {
        const rowArr = area[row]
        if (rowArr === undefined)
          area[row] = []

        for (let col = n.x; col < n.x + n.w; col++)
          area[row][col] = n.id
      }
    })
    return area
  },
}
