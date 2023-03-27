import { markRaw } from 'vue'
import CountDown from '~/components/countdown/CountDown.vue'
export const bentoCells = [
  { id: '1', x: 0, y: 0, width: 1, height: 1, component: markRaw(CountDown) },

]
