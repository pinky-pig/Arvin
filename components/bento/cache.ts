const store: any = {}

export default {
  set(key: any, val: any) {
    store[key] = val
  },

  get(key: any) {
    return store[key]
  },

  remove(key: any) {
    store[key] = null
    delete store[key]
  },
}
