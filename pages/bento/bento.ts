import { markRaw } from 'vue'
import CountDown from '~/components/countdown/CountDown.vue'
import Profile from '~/components/profile/Profile.vue'
import Mapbox from '~/components/mapbox/Mapbox.vue'
import Dark from '~/components/dark/Dark.vue'
import Weekly from '~/components/weekly/Weekly.vue'

export const bentoCellsInDesktop = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(Profile) },
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(Weekly) },
  { id: '3', x: 0, y: 1, width: 2, height: 1, component: markRaw(Mapbox) },
  { id: '4', x: 3, y: 1, width: 1, height: 1, component: markRaw(Dark) },
  { id: '5', x: 3, y: 1, width: 1, height: 1, component: markRaw(CountDown) },
]

export const bentoCellsInMobile = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(Profile) },
  { id: '2', x: 0, y: 2, width: 2, height: 1, component: markRaw(Weekly) },
  { id: '3', x: 0, y: 3, width: 2, height: 1, component: markRaw(Mapbox) },
  { id: '4', x: 0, y: 4, width: 1, height: 1, component: markRaw(CountDown) },
  { id: '5', x: 1, y: 4, width: 1, height: 1, component: markRaw(Dark) },
]
