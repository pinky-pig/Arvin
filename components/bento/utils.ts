export default {
  getOffset(
    node: HTMLElement | null,
    parent: HTMLElement,
    offset: {
      offsetX: number
      offsetY: number
    },
  ): {
      offsetX: number
      offsetY: number
    } {
    offset = offset || { offsetX: 0, offsetY: 0 }

    if (node === null)
      return offset

    if (node === parent)
      return offset

    offset.offsetX += node.offsetLeft
    offset.offsetY += node.offsetTop

    return this.getOffset(node.offsetParent as HTMLElement, parent, offset)
  },

  searchUp(
    node: HTMLElement | null,
    className: string,
  ): HTMLElement | null {
    if (node === null)
      return null
    if (node.classList.contains(className) || node === document.body)
      return node
    return this.searchUp(node.parentNode as HTMLElement, className)
  },
}
