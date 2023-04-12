import { markRaw } from 'vue'
import CountDown from '~/components/countdown/index.vue'
import Profile from '~/components/profile/index.vue'
import Mapbox from '~/components/mapbox/index.vue'
import Dark from '~/components/dark/Dark.vue'
import Weekly from '~/components/weekly/index.vue'
import Notion from '~/components/notion/index.vue'

export const bentoCellsInDesktop = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(Profile) },
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(Weekly) },
  { id: '3', x: 0, y: 1, width: 2, height: 1, component: markRaw(Mapbox) },
  { id: '4', x: 3, y: 1, width: 1, height: 1, component: markRaw(Dark) },
  { id: '5', x: 3, y: 2, width: 2, height: 1, component: markRaw(CountDown) },
  { id: '6', x: 0, y: 3, width: 1, height: 1, component: markRaw(Notion) },
]

export const bentoCellsInMobile = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(Profile) },
  { id: '2', x: 0, y: 2, width: 2, height: 1, component: markRaw(Weekly) },
  { id: '3', x: 0, y: 3, width: 2, height: 1, component: markRaw(Mapbox) },
  { id: '4', x: 0, y: 4, width: 2, height: 1, component: markRaw(CountDown) },
  { id: '5', x: 0, y: 5, width: 1, height: 1, component: markRaw(Dark) },
  { id: '6', x: 1, y: 5, width: 1, height: 1, component: markRaw(Notion) },
]
