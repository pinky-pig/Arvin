import type { GridCellsType } from '..'
import { distanceBetweenPointAndSegment } from './math'

export function hitTest(
  element: any,
  x: any,
  y: any,
) {
  const lineThreshold = 10
  const x1 = getElementAbsoluteX1(element)
  const x2 = getElementAbsoluteX2(element)
  const y1 = getElementAbsoluteY1(element)
  const y2 = getElementAbsoluteY2(element)
  // (x1, y1) --A-- (x2, y1)
  //    |D             |B
  // (x1, y2) --C-- (x2, y2)
  return (
    distanceBetweenPointAndSegment(x, y, x1, y1, x2, y1) < lineThreshold // A
      || distanceBetweenPointAndSegment(x, y, x2, y1, x2, y2) < lineThreshold // B
      || distanceBetweenPointAndSegment(x, y, x2, y2, x1, y2) < lineThreshold // C
      || distanceBetweenPointAndSegment(x, y, x1, y2, x1, y1) < lineThreshold // D
  )
}

export function getElementAbsoluteX1(bound: GridCellsType) {
  return bound.width >= 0 ? bound.x : bound.x + bound.width
}
export function getElementAbsoluteX2(bound: GridCellsType) {
  return bound.width >= 0 ? bound.x + bound.width : bound.x
}
export function getElementAbsoluteY1(bound: GridCellsType) {
  return bound.height >= 0 ? bound.y : bound.y + bound.height
}
export function getElementAbsoluteY2(bound: GridCellsType) {
  return bound.height >= 0 ? bound.y + bound.height : bound.y
}
